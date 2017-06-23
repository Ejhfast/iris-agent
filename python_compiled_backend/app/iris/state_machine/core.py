import copy
from .. import iris_objects

class StateMachineRunner:
    def __init__(self, state_machine):
        self.original_state = state_machine
        self.current_state = state_machine
        self.previous_state = []
        self.previous_context = []
    # get current state machine output
    def current_output(self):
        print(self.current_state)
        if self.current_state.error:
            message_out = self.current_state.error
            self.current_state.error = None
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
    def go_back(self):
        print(self.previous_state)
        while len(self.previous_state) > 0 and self.previous_state[-1].reset().accepts_input == False:
            self.previous_state.pop()
            self.previous_context.pop()
        if len(self.previous_state) > 0:
            previous_state, previous_context = self.previous_state.pop(), self.previous_context.pop()
            self.current_state = previous_state(previous_context)
            print("GO BACK", previous_state, previous_context)
        else:
            self.current_state = self.original_state
            self.original_state.reset()
    # proceed to next state for machine
    def next_state(self, text):
        #self.previous_state.append(self.current_state)
        #self.previous_context.append(copy.deepcopy(self.current_state.context))
        new_state = self.current_state.next_state(text)
        print("TRANSITIONING", self.current_state, new_state)
        if isinstance(new_state, StateMachine):
            self.current_state = new_state(self.current_state.context)
            return True
        else:
            self.current_state = new_state # appropriate?
            return False

class StateMachine:
    def __init__(self):
        self.accepts_input = True
        self.error = None
        self.context = { "ASSIGNMENTS": {}, "ASSIGNMENT_NAMES": {}, "assign": [] }
        self.when_done_state = None
        self.output = []
        self.middleware = []
        self.previous_state = None
    # this allows us to pass context, and gives an execution hook after context is set
    def __call__(self, context):
        self.context = dict(context)
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
    # does this machine support assignment
    def is_assignable(self):
        return False
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
