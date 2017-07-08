from .basic import StateMachine, Scope, AssignableMachine, Assign, DoAll, Print, ValueState, Value
from .model import IRIS_MODEL
from .. import util

# this state machine generates a bound function given a set of binding values,
# TODO: possibly should refactor into a plain function, doesn't need to be a class / SM wrapper
class BoundFunction(AssignableMachine):
    # "bindings" is a dictionary mapping argument names to values
    # "function" is an IrisFunction (see expression.py)
    def __init__(self, bindings, function, iris = IRIS_MODEL):
        self.iris = iris
        self.bindings = bindings
        self.function = function
        super().__init__()
        self.accepts_input = False
    def set_query(self, query):
        self.function.query = query
    def next_state_base(self, text):
        # .binding_machine is a mirror of argument_types, except that it is intented to hold values rather than request logic
        # TODO: setting magic attributes is kind of gross, API for this?
        self.function.binding_machine = {**self.bindings, **self.function.binding_machine} #binding_machine
        return self.function.when_done(self.get_when_done_state())

# This is the state machine wrapper for the current argument matching logic (map user input on to arguments)
# The specifics of that logic exist in util.arg_match, and will hopefully be improved in the future
# If that logic finds a match, we create a new BoundFunction with the respective matches
class ArgMatch(AssignableMachine):
    # "function" is an IrisFunction
    # "query" is the user input
    def __init__(self, function, query, iris = IRIS_MODEL):
        self.iris = IRIS_MODEL
        super().__init__()
        self.function = function
        self.query = query
        self.accepts_input = False
    def next_state_base(self, text):
        matches, bindings = [], {}
        argument_types = self.function.argument_types
        # nothing fancy here, walk over the training examples and try to match
        for cmd in self.function.training_examples():
            succ, map_ = util.arg_match(self.query, cmd)
            # if we get a template string match, we still need to check for type match
            if succ:
                convert_types = {k: argument_types[k].convert_type(v, doing_match=True) for k,v in map_.items()}
                if all([v[0] for k,v in convert_types.items()]):
                    for arg, vals in convert_types.items():
                        # ValueState does an immediate assignment on a value
                        # So as arguments are walked over, these automata will be executed to just return and bind value right away
                        bindings[arg] = ValueState(vals[1], name=map_[arg])
        return BoundFunction(bindings, self.function).when_done(self.get_when_done_state())
