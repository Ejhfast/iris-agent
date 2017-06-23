from .basic import StateMachine, Scope, AssignableMachine, Assign, DoAll, Print, ValueState, Value
from .model import IRIS_MODEL
from .. import util

# this state machine generates a bound function given a set of binding values, possibly should refactor into a function
# depends on: basics
class BoundFunction(AssignableMachine):
    def __init__(self, bindings, function, iris = IRIS_MODEL):
        self.iris = iris
        self.bindings = bindings
        self.function = function
        super().__init__()
        self.accepts_input = False
    def set_query(self, query):
        self.function.query = query
    def next_state_base(self, text):
        self.function.binding_machine = {**self.bindings, **self.function.binding_machine} #binding_machine
        return self.function.when_done(self.get_when_done_state())

# This is the state machine wrapper for the current argument matching logic
# If that logic finds a match, we create a new BoundFunction with the respective matches
# depends on: basics, BoundFunction
class ArgMatch(AssignableMachine):
    def __init__(self, function, query, iris = IRIS_MODEL):
        self.iris = IRIS_MODEL
        super().__init__()
        self.function = function
        self.query = query
        self.accepts_input = False
    def next_state_base(self, text):
        matches, bindings = [], {}
        argument_types = self.function.argument_types
        for cmd in self.function.training_examples():
            succ, map_ = util.arg_match(self.query, cmd)
            if succ:
                convert_types = {k: argument_types[k].convert_type(v, doing_match=True) for k,v in map_.items()}
                if all([v[0] for k,v in convert_types.items()]):
                    for arg, vals in convert_types.items():
                        bindings[arg] = ValueState(vals[1], name=map_[arg])
        return BoundFunction(bindings, self.function).when_done(self.get_when_done_state())
