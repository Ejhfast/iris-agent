import copy
from .. import iris_objects

# This file contains the core automata logic, inherited by IrisCommands, Types, etc.
# TODO: a bit of switching between SM and automata, be more consistent

class StateMachineRunner:
    def __init__(self, state_machine):
        self.original_state = state_machine
        self.current_state = state_machine
        self.previous_state = []
        self.previous_context = []
    # get current state machine output
    def current_output(self):
        # If there's an error, we'll return that, else the state output
        # Error's only happen with non-checking types that don't map on to a new command at this pointer
        # TODO: can possibly remove
        if self.current_state.error:
            message_out = self.current_state.error
            self.current_state.clear_error()
            return message_out
        return self.current_state.get_output()
    # keep running the state machine until it needs user input
    def run_until_input_required(self):
        keep_going = True
        outputs = []
        while keep_going and (not self.current_state.get_accepts_input()):
            keep_going = self.next_state(None)
            if keep_going:
                outputs = outputs + self.current_output()
        return keep_going, outputs
    # reset machine
    def reset(self):
        self.current_state = self.original_state
        self.original_state.reset()
        self.previous_state = []
        self.previous_context = []
        return self
    # TODO: this is broken, potentially fix! Not exposed in UI right now
    def go_back(self):
        while len(self.previous_state) > 0 and self.previous_state[-1].reset().accepts_input == False:
            self.previous_state.pop()
            self.previous_context.pop()
        if len(self.previous_state) > 0:
            previous_state, previous_context = self.previous_state.pop(), self.previous_context.pop()
            self.current_state = previous_state(previous_context)
        else:
            self.current_state = self.original_state
            self.original_state.reset()
    # proceed to next state for machine
    def next_state(self, text, class_index=None):
        # commented out below was incredibly slow if i remember, reason i removed and broke "go back"?
        #self.previous_state.append(self.current_state)
        #self.previous_context.append(copy.deepcopy(self.current_state.context))
        # ask the state for its next state
        if class_index:
            self.current_state.set_class_index(class_index)
        new_state = self.current_state.next_state(text)
        # if that's a state, set current state there
        if isinstance(new_state, StateMachine):
            self.current_state = new_state(self.current_state.context)
            return True
        # else we have a value, which likely we don't care about
        else:
            self.current_state = new_state # appropriate? won't be a state type
            return False

class StateMachine:
    # TODO: possibly clean up some of these attributes that are not in use anymore
    def __init__(self):
        # important! determines whether this state accetps input from user (feeds a "text" argument to next_state_base)
        self.accepts_input = True
        self.error = None
        self.context = { "ASSIGNMENTS": {}, "ASSIGNMENT_NAMES": {}, "assign": [] }
        self.when_done_state = None
        self.caller = None
        # important! output defines what the state will output to the user
        self.output = []
        self.middleware = []
        self.previous_state = None
    # this allows us to pass context, and gives an execution hook after context is set
    def __call__(self, context):
        self.context = dict(context)
        return self
    # set reference back to parent before transition, used for argument delegation so that
    # an arg request has reference to its parent command
    def set_caller(self, caller):
        self.caller = caller
        return self
    def set_class_index(self, class_index):
        return self
    # add middleware to the state, will process input text and potentially make different choices
    def add_middleware(self, middleware):
        if isinstance(middleware, list):
            for m in middleware:
                self.middleware.append(m)
        else:
            self.middleware.append(middleware)
        return self
    # peek into future
    def hint(self, text):
        for middleware in self.middleware:
            if middleware.test(text):
                return middleware.hint(text)
        return self.base_hint(text)
    def base_hint(self, text):
        return []
    # clear all context (internal state)
    def reset_context(self):
        self.context = { "ASSIGNMENTS": {}, "ASSIGNMENT_NAMES": {}, "assign": [] }
        return self
    # any kind of reset
    def reset(self):
        return self
    # once one machine is "done" (no explicit next state), do we want to do
    # something else? useful for lists of things to do, or loops
    def when_done(self, new_state):
        if isinstance(new_state, StateMachine):
            self.when_done_state = new_state
        #elif not (new_state == None):
        #    raise Exception("Trying to set when_done with {}".format(new_state))
        return self
    # getter for accepts_input (does this state need input from user)
    def get_accepts_input(self):
        return self.accepts_input
    # getter for when_done state
    def get_when_done_state(self):
        return self.when_done_state
    # read a variable from context
    def read_variable(self, varname):
        if varname in self.context["ASSIGNMENTS"]:
            return self.context["ASSIGNMENTS"][varname]
        return None
    # write a variable to context
    def write_variable(self, varname, value):
        self.context["ASSIGNMENTS"][varname] = value
    def append_variable(self, varname, value):
        if not varname in self.context["ASSIGNMENTS"]:
            self.context["ASSIGNMENTS"][varname] = [value]
        else:
            self.context["ASSIGNMENTS"][varname].append(value)
    def delete_variable(self, varname):
        if varname in self.context["ASSIGNMENTS"]:
            del self.context["ASSIGNMENTS"][varname]
    # getter for context:
    def get_context(self):
        return self.context
    # getter on output, the source of output to user
    def get_output(self):
        return self.output
    # set error message state
    def set_error(self, data=None):
        self.error = data
        return self
    # clear error
    def clear_error(self):
        self.error = None
        return self
    # tells machine how to generate error message
    def error_message(self):
        return self.output
    # wrap the next_state_base function, allow for linked-list style machines
    def next_state(self, text):
        next_state = self.next_state_base(text)
        # if we're done, but the state has a pointer to some other state, go there
        if (not isinstance(next_state, StateMachine)) and self.get_when_done_state():
                next_state = self.get_when_done_state()
        # peek at the future, then (if middleware), decide if we want to go there
        for middleware in self.middleware:
            if middleware.test(text):
                next_state = middleware.transform(self, next_state, text)
        return next_state
    # placeholder for move to next state
    def next_state_base(self, text):
        return self
