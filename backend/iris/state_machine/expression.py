from .basic import StateMachine, Scope, AssignableMachine, Assign, DoAll, Print, ValueState, Value
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

# the Function class returns a value, as well as a representation of the
# the program that produced that value
class FunctionReturn:
    def __init__(self, value, program):
        self.value = value
        self.program = program
    # giving this the same API as EnvRef, because the can be present in same placed (e.g., DataframeSelector)
    # TODO: organize to reflect this
    def get_value(self, iris):
        return self.value

# helper for .binding_machine that wraps a value in ValueState (for assignment)
# or else unwraps the program component from a FunctionReturn value, the logic that produced the resul
def value_or_program(value):
    return ValueState(value) if not isinstance(value, FunctionReturn) else value.program

# as a user interacts with commands in the environment, we want to build an AST that reflects what they have done
# this handles a basic component of that, given an Iris Command ("function") that has been resolved with
# a set of args ("args"), we want to save a representation of that function call (that we can potentially edit later)
# note that this can be nested, in that some arguments in args may have been the result of other command calls,
# and so we want to stitch these ASTs together
# TODO: this function is only called in Function, refactor?
# TODO: so messy, give IrisCommand a proper API for this?
def compile_function(function, args):
    new_function = IrisCommand(index_command=False, compiled=True)
    new_function.command = function.command
    new_function.explanation = function.explanation
    new_function.command_args = function.command_args
    new_function.argument_types = {k:copy.copy(v) for k,v in function.argument_types.items()}
    # TODO: "copy of" is for debugging, we are not actually allowing users to save these new ASTs right now
    # so in practice the contents of the title field don't matter
    new_function.title = "copy of " + function.title
    new_function.__parent__ = function
    # we need to override the default output behavior of this copied Iris command
    new_function.set_output()
    #new_function.output = ["Sure, I can call {}".format(function.title)]
    for key, value in args.items():
        new_function.binding_machine[key] = value_or_program(value)
    return new_function

# arguments resolved by the Function state machine need to be unwrapped, because
# 1) we are also returning the program that got there in case of nested commands 2) env vars need to be unpacked to value
# TODO: this function is only called in IrisFunction, refactor?
def resolve_arg_ref(iris, var):
    if isinstance(var, iris_objects.EnvReference):
        return iris.env[var.name]
    if isinstance(var, FunctionReturn):
        return var.value
    return var

# This is the core logic that defines conversations-as-function, possibly merge with IrisCommand
# depends on: basics, StateException, compile_function
class Function(Scope, AssignableMachine):
    # all functions/commands have titles (what appears in the hint)
    title = "Function title"
    # dictionary with argument type information, key=arg_name, value=arg_type
    argument_types = {}
    # examples of other user input that trigger the function
    examples = []
    # this attribute is used to keep track of the original query string that triggered the function
    query = None
    def __init__(self, iris = IRIS_MODEL):
        # infer argument names from keys in argument_types dict
        self.command_args = self.command.__code__.co_varnames[:self.command.__code__.co_argcount][1:]
        # merge in any inline annotations via python3 syntax
        self.argument_types = {**self.command.__annotations__, **self.argument_types}
        # bindings for each type represent values or logic bound to each argument, sort of like a closure
        # used for argument matching and AST generation
        self.binding_machine = {}
        super().__init__()
        # does not take immediate input from user, leave that to arg logic to decide
        self.accepts_input = False
        # inherited setup call (scope)
        self.init_scope()
        # we want to set initial output after title has been defined
        self.set_output()
        self.iris = IRIS_MODEL
    # for debugging ASTs: print out structure of function (and its composed elements)
    # TODO: remove from main release?
    def pretty_print(self):
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
    # helper function to set the query data
    def set_query(self, text):
        self.query = text
    # we want to set initial output after title is defined
    def set_output(self):
        self.output = [{"type":"title", "text": "Sure, I can " + self.title.lower(), "title":self.title.lower()}]
    # helper to get training examples for this function
    def training_examples(self):
        # TODO: probably just factor this out to IrisCommand (Function objects don't have a class index)
        if hasattr(self, "class_index"):
            return self.iris.class2cmd[self.class_index]
        return [self.title] + self.examples
    # this maps each argument to a string representation (name) of what it is bound to
    # e.g., "x" => "2" or "x" => "my_var", this data is store in ASSIGNMENT_NAMES
    def generate_name_bindings(self):
        out = {}
        for arg in self.command_args:
            scoped = self.gen_scope(arg)
            out[arg] = self.context["ASSIGNMENT_NAMES"][scoped]
        return out
    # main transition logic for Iris functions
    def next_state_base(self, text):
        self.output = []
        # if we have gathered all the arguments
        if all([self.read_variable(arg) != None for arg in self.command_args]):
            # so here we want to create a new function
            program_so_far = compile_function(self, {arg:self.read_variable(arg) for arg in self.command_args})
            # get a concrete representation of the args
            args = [resolve_arg_ref(self.iris, self.read_variable(arg)) for arg in self.command_args]
            try:
                # run the function!
                result = self.command(*args)
            except:
                # TODO: why does this seem to sometimes not catch exceptions?
                print(str(sys.exc_info()[1]))
                return StateException(str(sys.exc_info()[1])).when_done(self.get_when_done_state())
            # moved from IrisCommand because blocks need acces to that/etc.
            # store the most recent value and program data in memory
            # for example, the last return value can be accessed through the "that" keyword
            self.iris.add_to_env("__MEMORY__", result)
            self.iris.add_to_env("__MEMORY_FUNC__", program_so_far)
            # package everything up for whatever higher-level process wants it
            return_val = FunctionReturn(result, program_so_far)
            self.assign(return_val, name="COMMAND VALUE")
            return return_val
        # otherwise, if we don't have all the args, iterate through them
        for arg in self.command_args:
            # if we don't have the arg
            if self.read_variable(arg) == None:
                # first choice is an expicit state machine we know to run and bind to
                # maybe given by argmath, maybe we are running saved AST
                # we would only sometimes have this
                if arg in self.binding_machine:
                    # we are using copy here, because if we re-run, do not want these
                    # states to have changed
                    type_machine = copy.copy(self.binding_machine[arg]).set_arg_name(arg)
                # second choice is the logic for user argument extraction
                # we should always have this
                else:
                    type_machine = self.argument_types[arg].set_arg_name(arg)
                    # TODO: two lines below enable the arg_1->arg_n dependency hack. make this nicer!
                    # (the only thing using this now is the dataframe stuff, search for .arg_context to see)
                    type_machine.gen_scope = self.gen_scope # hack for now
                    type_machine.arg_context = self.context
                # assign this arg and loop back to self
                return Assign(self.gen_scope(arg), type_machine).when_done(self)
    def command(self):
        pass

# Here is the prettier form of functions that we expose to users
class IrisCommand(Function):
    # dictionary to hold help information for each argument
    argument_help = {}
    # some of these things are defined dynamically and we want a place to store source (can't just call inspect)
    __source_code__ = None
    __explain_code__ = None
    # "index_command" determines whether the command should be indexed with global model (logistic regression)
    # "compiled" tells whether this is a constructed AST or coming dymanically from user input
    # TODO: rename "compiled" to "is_ast"
    def __init__(self, index_command=True, compiled=False):
        super().__init__()
        self.compiled = compiled
        if index_command:
            self.class_index = self.iris.add_command(self)
        # make sure all the arguments have types / automata
        for arg in self.command_args:
            if not arg in self.argument_types:
                raise Exception("{} needs an argument type".format(arg))
        # initialize helper middleware
        # TODO: possibly remove helper middlewhere given docs?
        self.add_help()
    # core logic of iris command
    def next_state_base(self, text):
        # first, call the function logic
        next_state = super().next_state_base(text)
        # is the return a state machine? (it could be looping back to itself, for example)
        if not isinstance(next_state, StateMachine):
            # then it must be a normal function return value. unpack that:
            ret_val = next_state.value
            program = next_state.program
            # is the unpacked value a state machine?
            if isinstance(ret_val, StateMachine):
                # if so, we're going to pass control to that
                # TODO: are any commands still using this functionality?
                return ret_val
            # otherwise, we'll gather an explanation
            print_out = self.wrap_explanation(ret_val)
            # attempt to learn from this call
            succ, learning = self.iris.learn(self, self.generate_name_bindings())
            # TODO: possibly remove this
            if succ:
                print_out.append("I learned \"{}\"".format(learning))
            # and finally, if this is not a "compiled" function (saved and reused AST)
            # print out results
            if not self.compiled:
                return DoAll([Print(print_out)]).when_done(self.get_when_done_state())
            return None
        return next_state
    # if this is a "compiled" function, not going to print out any intermediate data/questions
    def get_output(self):
        if self.compiled:
            return []
        return self.output
    # function to initiate helper middleware
    # TODO: possibly remove, given docs
    def add_help(self):
        for arg, type in self.argument_types.items():
            if arg in self.argument_help:
                help_state = self.argument_help[arg]
            else:
                help_state = "No help available for this argument."
            self.argument_types[arg].add_middleware(ExplainMiddleware(help_state, arg))
    # explanation wraps a command's output and presents it differently to a user
    # by default, it will just return the result of the command
    def explanation(self, result):
        return result
    # iris commands also wrap the results provided by explanations, and give them types and
    # data formatting that match up with react components on the frontend
    def wrap_explanation(self, result):
        results = self.explanation(result)
        out = []
        for r in util.single_or_list(results):
            # basically, if command wants to overwrite display type directly, let it
            if isinstance(r, dict) and "type" in r:
                out.append(r)
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
            # by defauly, just transform it into a string
            else:
                out.append(str(r))
        return out
    # this function destructures a command into a documentation object
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
            # replace "def command()" and remove "self"
            "source": gencode.rename_code(self.__class__.__name__, code)[1]
        }

# This state machine prints out an exception and exits the current state loop (if any)
# TODO: can this just be a flat function?
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

# do some type checking

class TypeCheck(Scope, AssignableMachine):
    def __init__(self, type_, state_machine):
        self.to_check = type_
        self.to_run = state_machine
        super().__init__()
        self.accepts_input = False
        self.init_scope()
    def next_state_base(self, text):
        # first run state machine, if haven't, assign output to result
        if self.read_variable("RUN_RESULT") == None:
            return Assign(self.gen_scope("RUN_RESULT"), self.to_run).when_done(self)
        result = self.read_variable("RUN_RESULT").value # unpack FunctionReturn
        # unpack EnvReference, if it exists
        if isinstance(result, iris_objects.EnvReference):
            result_val = result.get_value()
        else:
            result_val = result
        # if type checks, great
        if self.to_check.is_type(result_val):
            self.assign(self.read_variable("RUN_RESULT"), name="COMMAND VALUE")#(result_val, name="COMMAND VALUE")
            return None
        # otherwise try conversion
        return t.conversion_raw(result_val, self.to_check, self.get_when_done_state())

# Some more complex automata, NOT in general use now, but working

# This is the current way of processing a block of expressions in the system
# depends on: basics, ApplySearch, FunctionReturn, Block
# removed for now due to issues with code generation (generating blocks)
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
        return ValueState(FunctionReturn(None, program)).when_done(self.get_when_done_state())

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
        return ValueState(FunctionReturn(None, program)).when_done(self.get_when_done_state())

# TODO: "make holes" is a terrible name
# The idea here is that we are walking over an AST, looking at var references, and asking whether they
# should paramaterize the function, or be stored as constants

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
