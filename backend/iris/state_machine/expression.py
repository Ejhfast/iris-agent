from .basic import StateMachine, Scope, AssignableMachine, Assign, DoAll, Print, ValueState, Value
from .advanced import AddToIrisEnv2
from .command_search import FunctionSearch, ApplySearch
from .argmatch import ArgMatch, BoundFunction
from .ast import If, While, Block
from . import types as t
from .model import IRIS_MODEL
from .middleware import Middleware, ExplainMiddleware
from .. import util
from .. import iris_objects
from .. import gencode
import copy
import sys
import inspect

class NoneState:
    value = None

# the Function class returns a value, as well as a representation of the
# the program that produced that value
class FunctionReturn:
    def __init__(self, value, program):
        self.value = value
        self.program = program

def value_or_program(value):
    return ValueState(value) if not isinstance(value, FunctionReturn) else value.program

# here we are going to create a representation of each expression in the env
# as evaluation continues, we can use this later to learn from user commands
# depends on: IrisCommand
def compile_function(function, args):
    new_function = IrisCommand(index_command=False, compiled=True)
    new_function.command = function.command
    new_function.explanation = function.explanation
    new_function.command_args = function.command_args
    new_function.argument_types = {k:copy.copy(v) for k,v in function.argument_types.items()}
    new_function.title = "copy of " + function.title
    new_function.__parent__ = function
    new_function.set_output()
    #new_function.output = ["Sure, I can call {}".format(function.title)]
    for key, value in args.items():
        new_function.binding_machine[key] = value_or_program(value)
    return new_function

# since variables are behaving more like references now, where the underlying
# value can change, and that should be reflected if e.g., a function is called again
# TODO: this is more general now, represents processing done on arguments before they
# are passed to function command code
# depends on: FunctionReturn, iris_objects
def resolve_env_ref(iris, var):
    if isinstance(var, iris_objects.EnvReference):
        return iris.env[var.name]
    if isinstance(var, FunctionReturn):
        return var.value
    return var

# similar name helper for assignment names
# depends on: iris_objects
def resolve_env_name(iris, var):
    if isinstance(var, iris_objects.EnvReference):
        return var.name
    return var


# this is a wrapper to call MakeHolesFunction on a function specified by the user
# depends on: basics, MakeHolesFunction, FunctionSearch
class CallMakeHoles(Scope, AssignableMachine):
    def __init__(self):
        super().__init__()
        self.accepts_input = False
        self.init_scope()
    def next_state_base(self, text):
        if not self.read_variable("FUNCTION") == None:
            get_func = self.read_variable("FUNCTION").function.function # Wrapper.Args
            return MakeHolesFunction(get_func).when_done(self.get_when_done_state())
        return Assign(self.gen_scope("FUNCTION"), FunctionSearch()).when_done(self)

# Experimental, needs refactoring
# This function recurses over an Iris AST, poking "holes" in bound arguments
# depends on: basics, Function, Block, If (AST?)
class MakeHolesFunction(Scope, AssignableMachine):
    def __init__(self, function):
        self.function = function
        super().__init__()
        self.accepts_input = False
        self.init_scope()
    def next_state_base(self, text):
        print(self.function, self.function.binding_machine)
        if all([self.read_variable(arg) != None for arg in self.function.binding_machine.keys()]):
            for arg in list(self.function.binding_machine.keys()):
                if self.read_variable(arg) == False:
                    del self.function.binding_machine[arg]
            return ValueState("HOLES").when_done(self.get_when_done_state())
        # here we are walking over all bound arguments to the function
        for arg in self.function.binding_machine.keys():
            if self.read_variable(arg) == None:
                to_print = Print(["I am inside {}".format(self.function.title)])
                # test if argument is a function, call recursively
                if isinstance(self.function.binding_machine[arg], Function):
                    return Assign(self.gen_scope(arg), DoAll([
                        to_print,
                        MakeHolesFunction(self.function.binding_machine[arg])
                        ])).when_done(self)
                # test if argument is block, recurse over each individual statement
                elif isinstance(self.function.binding_machine[arg], Block):
                    return Assign(self.gen_scope(arg), DoAll([
                        MakeHolesFunction(x) for x in self.function.binding_machine[arg].get_states()
                    ])).when_done(self)
                # test if function is an if statement, treat appropriately (more experimental)
                elif isinstance(self.function.binding_machine[arg], If):
                    if_stmt = self.function.binding_machine[arg]
                    return Assign(self.gen_scope(arg), DoAll([
                        MakeHolesFunction(if_stmt.condition),
                        MakeHolesFunction(if_stmt.true_exp)
                    ]))
                # otherwise, this is a concrete value, ask if the user wants to keep it
                return Assign(self.gen_scope(arg), DoAll([
                    to_print,
                    Print(util.print_assignment(arg, None, self.function.binding_machine[arg].value)),
                    t.YesNo("Do you want to keep {}? If not, I will make it a variable".format(arg),
                        yes=True,
                        no=False)])).when_done(self)

# This middleware allows us to inject a function application within any argument resolution
# depends on: ApplySearch, FunctionSearch, WorkLoop
class IrisMiddleware(Middleware):
    def __init__(self, arg, iris = IRIS_MODEL):
        self.iris = IRIS_MODEL
        self.arg = arg
    def test(self, text):
        if text and len(text.split()) > 1 and text[0] != "\"":
            return True
        return False
    def hint(self, text):
        predictions = self.iris.predict_commands(text, 3)
        arg_matches = [(util.first_match([util.arg_match(text, x) for x in self.iris.class2cmd[cmd[0].class_index]]), cmd[0].title) for cmd in predictions]
        return [util.replace_args(*x) for x in arg_matches]
    def transform(self, caller, state, text):
        state.clear_error()
        if isinstance(caller, WorkLoop) or isinstance(caller, FunctionSearch):
            return state
        return ApplySearch(text=text).when_done(caller.get_when_done_state()).set_arg_name(self.arg)

# This is the core logic that defines conversations-as-function, possibly merge with IrisCommand
# depends on: basics, StateException, compile_function, IrisMiddleware
class Function(Scope, AssignableMachine):
    title = "Function title"
    argument_types = {}
    examples = []
    query = None
    def __init__(self, iris = IRIS_MODEL):
        self.command_args = self.command.__code__.co_varnames[:self.command.__code__.co_argcount][1:]
        self.argument_types = {**self.command.__annotations__, **self.argument_types}
        self.binding_machine = {}
        super().__init__()
        self.accepts_input = False
        self.init_scope()
        self.set_output()
        self.iris = IRIS_MODEL
    def pretty_print(self):
        print(self.title)
        for arg in self.command_args:
            if arg in self.binding_machine:
                if isinstance(self.binding_machine[arg], Function):
                    print("recursing:")
                    self.binding_machine[arg].pretty_print()
                elif isinstance(self.binding_machine[arg], ValueState):
                    print(self.binding_machine[arg].value)
                else:
                    print(self.binding_machine[arg].__class__)
            elif arg in self.argument_types:
                print(self.argument_types[arg].__class__)
            else:
                print("{} not found".format(arg))
    def set_query(self, text):
        self.query = text
    def set_output(self):
        self.output = [{"type":"title", "text": "Sure, I can " + self.title.lower(), "title":self.title.lower()}]
    def training_examples(self):
        if hasattr(self, "class_index"):
            return self.iris.class2cmd[self.class_index]
        return [self.title] + self.examples
    def generate_name_bindings(self):
        out = {}
        for arg in self.command_args:
            scoped = self.gen_scope(arg)
            out[arg] = self.context["ASSIGNMENT_NAMES"][scoped]
        return out
    def next_state_base(self, text):
        self.output = []
        if all([self.read_variable(arg) != None for arg in self.command_args]):
            # so here we want to create a new function
            program_so_far = compile_function(self, {arg:self.read_variable(arg) for arg in self.command_args})
            args = [resolve_env_ref(self.iris, self.read_variable(arg)) for arg in self.command_args]
            try:
                result = self.command(*args)
            except:
                print(str(sys.exc_info()[1]))
                return StateException(str(sys.exc_info()[1])).when_done(self.get_when_done_state())
            # moved from IrisCommand because blocks need acces to that/etc.
            self.iris.add_to_env("__MEMORY__", result)
            self.iris.add_to_env("__MEMORY_FUNC__", program_so_far)
            return_val = FunctionReturn(result, program_so_far)
            self.assign(return_val, name="COMMAND VALUE")
            return return_val
        out = []
        for arg in self.command_args:
            if self.read_variable(arg) != None:
                assign_name = self.context["ASSIGNMENT_NAMES"][self.gen_scope(arg)]
                #out.append(Print(util.print_assignment(arg, assign_name, self.read_variable(arg))))
            else:
                # first choice is an expicit state machine we know to run and bind to
                # we would only sometimes have this
                if arg in self.binding_machine:
                    # we are using copy here, because if we re-run, do not want these
                    # states to be altered
                    type_machine = copy.copy(self.binding_machine[arg]).set_arg_name(arg)
                    print("BOUND", type_machine)
                # second choice is the logic for user argument extraction
                # we should always have this
                else:
                    type_machine = self.argument_types[arg].set_arg_name(arg)#.add_middleware(IrisMiddleware(arg))
                    type_machine.gen_scope = self.gen_scope # hack for now
                    type_machine.arg_context = self.context
                out.append(Assign(self.gen_scope(arg), type_machine))
                return DoAll(out).when_done(self)
    def command(self):
        pass

# Here is the prettier form of functions that we expose to users
# depends on: Function, iris_objects, ExplainMiddleware
class IrisCommand(Function):
    argument_help = {}
    __source_code__ = None
    __explain_code__ = None
    def __init__(self, index_command=True, compiled=False):
        super().__init__()
        self.compiled = compiled
        if index_command:
            self.class_index = self.iris.add_command(self)
        for arg in self.command_args:
            if not arg in self.argument_types:
                raise Exception("{} needs an argument type".format(arg))
        self.add_help()
    def next_state_base(self, text):
        next_state = super().next_state_base(text)
        if not isinstance(next_state, StateMachine):
            ret_val = next_state.value
            program = next_state.program
            if isinstance(ret_val, StateMachine):
                return ret_val
            print_out = self.wrap_explanation(ret_val)
            succ, learning = self.iris.learn(self, self.generate_name_bindings())
            if succ:
                print_out.append("I learned \"{}\"".format(learning))
            if not self.compiled:
                return DoAll([Print(print_out)]).when_done(self.get_when_done_state())
            return None
        return next_state
    def get_output(self):
        if self.compiled:
            return []
        return self.output
    def add_help(self):
        for arg, type in self.argument_types.items():
            if arg in self.argument_help:
                help_state = self.argument_help[arg]
            else:
                help_state = "No help available for this argument."
            self.argument_types[arg].add_middleware(ExplainMiddleware(help_state, arg))
    def explanation(self, result):
        return result
    def wrap_explanation(self, result):
        results = self.explanation(result)
        out = []
        for r in util.single_or_list(results):
            if isinstance(r, dict) and "type" in r:
                out.append(r)
            elif isinstance(r, iris_objects.IrisImage):
                out.append({"type": "image", "value": r.value})
            elif isinstance(r, iris_objects.FunctionWrapper):
                out.append("<Bound function: {}>".format(r.name))
            elif isinstance(r, iris_objects.IrisModel):
                out.append("<{} X={} y={}>".format(r.model.__class__.__name__, util.print_list(r.dataframe_X.column_names, 4), util.print_list(r.dataframe_y.column_names, 4)))
            elif isinstance(r, iris_objects.IrisVega):
                out.append({"type":"vega", "spec":r.spec, "data":r.data})
            elif isinstance(r, iris_objects.IrisDataframe):
                package_data = r.generate_spreadsheet_data()
                out.append({"type":"collection", "value":package_data})
                # out.append("<Dataframe columns={}>".format(util.print_list(r.column_names, 6)))
            elif util.is_data(r):
                out.append({"type": "data", "value": util.prettify_data(r)})
            else:
                out.append(str(r))
        return out
    def docs(self):
        try:
            help_text = self.help_text
        except:
            help_text = []
        code = util.get_source(self)
        return {
            "title": self.title,
            "examples": self.examples,
            "description": help_text,
            "source": gencode.rename_code(self.__class__.__name__, code)[1]
        }


# This state machine prints out an exception and exits the current state loop (if any)
# depends on: basics
class StateException(StateMachine):
    def __init__(self, exception_text):
        super().__init__()
        self.accepts_input = False
        self.exception_text = exception_text
    def next_state_base(self, text):
        return Print([
            "Sorry, something went wrong with the underlying command.",
            self.exception_text
        ]).when_done(self.get_when_done_state())

# This is the current way of processing a block of expressions in the system
# depends on: basics, ApplySearch, FunctionReturn, Block
class WorkLoop(AssignableMachine):
    def __init__(self):
        super().__init__()
        self.output = ["Entering workflow, what would you like to do?"]
    def hint(self, text):
        if text and "done" in text:
            return ["ends current workflow"]
        else:
            return ApplySearch().base_hint(text)
    def next_state_base(self, text):
        if not self.read_variable("last_command") == None:
            self.append_variable("programs", self.read_variable("last_command").program)
        if text and "done" in text:
            print("WORKLOOP", self.read_variable("programs"))
            wrapped_program = FunctionReturn(self.read_variable("last_command").value, Block(self.read_variable("programs")))
            return DoAll([
                Print(["Okay, done with workflow."]),
                ValueState(wrapped_program) #ValueState(self.read_variable("last_command"))
            ]).when_done(self.get_when_done_state())
        else:
            self.output = []#["Still in workflow. What would you like to do next?"]
            return Assign("last_command", ApplySearch(text=text)).when_done(self)

# How users define a while loop (experimental)
# depends on: basics, FunctionReturn, While (AST), ApplySearch
class WhileState(AssignableMachine):
    def __init__(self):
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        if self.read_variable("condition") == None:
            return Assign("condition", ApplySearch(question = ["Condition?"])).when_done(self)
        if self.read_variable("true_exp") == None:
            return Assign("true_exp", ApplySearch(question = ["True exp?"])).when_done(self)
        program = While(self.read_variable("condition").program, self.read_variable("true_exp").program)
        if self.read_variable("condition").value == True:
            return DoAll([
                ValueState(FunctionReturn(self.read_variable("true_exp").value, program)),
                program
            ]).when_done(self.get_when_done_state())
        return ValueState(FunctionReturn(NoneState(), program)).when_done(self.get_when_done_state())

# How user executes and If statement
# depends on: basics, IF, FunctionReturn, ApplySearch
class IfState(AssignableMachine):
    def __init__(self):
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        if self.read_variable("condition") == None:
            return Assign("condition", ApplySearch(question = ["Condition?"])).when_done(self)
        if self.read_variable("true_exp") == None:
            return Assign("true_exp", ApplySearch(question = ["True exp?"])).when_done(self)
        program = If(self.read_variable("condition").program, self.read_variable("true_exp").program)
        print("program", self.read_variable("condition").program, self.read_variable("true_exp").program)
        if self.read_variable("condition").value == True:
            return ValueState(FunctionReturn(self.read_variable("true_exp").value, program)).when_done(self.get_when_done_state())
        return ValueState(FunctionReturn(NoneState(), program)).when_done(self.get_when_done_state())


class GetEnvValue(AssignableMachine):
    def __init__(self, env_val):
        self.env_val = env_val
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        return env_val.get_value(IRIS_MODEL)

# do some type checking

class TypeCheck(Scope, AssignableMachine):
    def __init__(self, type_, state_machine):
        self.to_check = type_
        self.to_run = state_machine
        super().__init__()
        self.accepts_input = False
        self.init_scope()
    def next_state_base(self, text):
        print("in type check")
        if self.read_variable("RUN_RESULT") == None:
            return Assign(self.gen_scope("RUN_RESULT"), self.to_run).when_done(self)
        result = self.read_variable("RUN_RESULT").value # FunctionReturn
        if isinstance(result, iris_objects.EnvReference):
            result_val = result.get_value()
        else:
            result_val = result
        print("checking...")
        if self.to_check.is_type(result_val):
            self.assign(self.read_variable("RUN_RESULT"), name="COMMAND VALUE")#(result_val, name="COMMAND VALUE")
            return None
        return t.conversion_raw(result_val, self.to_check, self.get_when_done_state())
