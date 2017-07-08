from .core import StateMachine
from .. import iris_objects
import uuid

# this gives automata the ability to perform assignment
# inherited by all type-oriented state machines, for example
class AssignableMachine(StateMachine):
    arg_name = None
    # assign a value to the variable at the top of the stack
    # this is a helper method that an inheriting state will call somewhere within its logic
    # to make an assignment happen
    def assign(self, value, name=None):
        if len(self.context["assign"]) > 0:
            curr_assign = self.context["assign"].pop()
            self.context["ASSIGNMENTS"][curr_assign] = value
            self.context["ASSIGNMENT_NAMES"][curr_assign] = name
    # set argument name for possible display purposes on interface
    def set_arg_name(self, name):
        self.arg_name = name
        return self

# this executes a series of computations in sequence
# for example, printing several messages then asking the user for a value
class DoAll(AssignableMachine):
    def __init__(self, states):
        self.states = states
        # link each state to the next state
        for i, _ in enumerate(self.states):
            if i+1 < len(self.states):
                self.states[i].when_done(self.states[i+1])
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        return self.states[0]
    def base_hint(self, text):
        return self.states[0].hint(text)
    def when_done(self, state):
        self.states[-1].when_done(state)
        return self
    def set_arg_name(self, name):
        for state in self.states:
            if isinstance(state, AssignableMachine):
                state.set_arg_name(name)
        return self

# automata that displays output to user, very common component of other automata classes
class Print(StateMachine):
    def __init__(self, output):
        super().__init__()
        self.output = output
        self.accepts_input = False
    def next_state_base(self, text):
        # TODO: do we still need to return a value wrapper that holds context?
        return Value(None, self.context)

# automata used to wrap another automata in an assignment condition
class Assign(StateMachine):
    # "variable" is what variable to assign
    # "assign_state" is the automata to wrap
    def __init__(self, variable, assign_state):
        self.variable = variable
        self.assign_state = assign_state
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        # push assignment to stack and execute next state
        # some state downstream (inheriting from AssignableMachine) will call .assign
        self.context["assign"].append(self.variable)
        return self.assign_state
    # pass through hint request to wrapped state
    def base_hint(self, text):
        return self.assign_state.hint(text)
    # pass through when_done logic to wrapped state
    def when_done(self, state):
        self.assign_state.when_done(state)
        return self

# helper automata for passing along a value for assignment
# manty automata return ValueState wrappers on a value they want to assign, unstead of doing the assignment themselves
class ValueState(AssignableMachine):
    def __init__(self, value, name=None):
        self.value = value
        self.name = name
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        if isinstance(self.value, iris_objects.IrisValue):
            self.assign(self.value, name=self.value.name)
        elif self.name:
            self.assign(self.value, name=self.name)
        else:
            self.assign(self.value)
        # doesn't matter what is returned here, as long as it is not an automata
        # we can still extend a computation by applying .when_done to the ValueState
        return None

# TODO: double check whether we still need this!
class Value:
    def __init__(self, result, context):
        self.result = result
        self.context = context

# scope allows nested automata assignments to make sense without overwriting each other in the context store
# e.g., prevents a child command variable named "x" from overwriting a parent command's variable of the same name
class Scope:
    # choose a random scope name
    def init_scope(self):
        self.scope = str(uuid.uuid4()).upper()[0:10]
    # new var name is join with scope name on underscore
    def gen_scope(self, name):
        return self.scope + "_" + name
    # helper to read scoped variable from context store
    def read_variable(self, varname):
        scope_var = self.gen_scope(varname)
        if scope_var in self.context["ASSIGNMENTS"]:
            return self.context["ASSIGNMENTS"][scope_var]
        return None
    # helper to write scoped variable to context store
    def write_variable(self, varname, value):
        scope_var = self.gen_scope(varname)
        self.context["ASSIGNMENTS"][scope_var] = value
    # helper for appending value to scoped var list
    # Note: this seems to be used by only one function, possibly refactor or remove
    def append_variable(self, varname, value):
        scope_var = self.gen_scope(varname)
        if not scope_var in self.context["ASSIGNMENTS"]:
            self.context["ASSIGNMENTS"][scope_var] = [value]
        else:
            self.context["ASSIGNMENTS"][scope_var].append(value)
    # likewise, this function is only being used in one place, maybe refactor or delete
    def delete_variable(self, varname):
        scope_var = self.gen_scope(varname)
        if scope_var in self.context["ASSIGNMENTS"]:
            del self.context["ASSIGNMENTS"][scope_var]
