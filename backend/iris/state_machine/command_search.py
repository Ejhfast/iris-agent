from .basic import StateMachine, Scope, AssignableMachine, Assign, DoAll, Print, ValueState, Value
from .model import IRIS_MODEL
from .argmatch import ArgMatch
from .. import iris_objects
from .. import util
import copy

# This is the state machine that allows a user to RETRIEVE a command from the system
# Basically, supporting first-class Iris commands
class FunctionSearch(AssignableMachine):
    # "text" means we will use a known query, otherwise this SM will ask user
    def __init__(self, question = ["What function would you like to retrieve?"], text = None, iris = IRIS_MODEL):
        self.iris = IRIS_MODEL
        super().__init__()
        self.question = question
        self.text = text
        self.output = question
        # not going to do any IO if we know what we're looking for
        if text:
            self.output = []
            self.accepts_input = False
    # hint will show a preview of what commands will be retrieved
    def base_hint(self, text):
        predictions = self.iris.predict_commands(text, 3)
        arg_matches = [(util.first_match([util.arg_match(text, x) for x in self.iris.class2cmd[cmd[0].class_index]]), cmd[0].title) for cmd in predictions]
        replace_args = [util.replace_args(*x) for x in arg_matches]
        if len(replace_args) > 0:
            replace_args[0] = {"style":"c0", "text":replace_args[0]}
        return replace_args
    # return docs object for a search
    # TODO: is this being used anywhere?
    def docs(self, text):
        prediction = self.iris.predict_commands(text, 1)[0]
        return prediction[0].docs()
    # here is how we retrieve and assign the desired function
    def next_state_base(self, text):
        if self.text:
            text = self.text
        # which command do we want?
        command, score = self.iris.predict_commands(text)[0]
        # create a fresh copy of a command, so that any changes to its context etc. do not affect future calls
        # TODO: this has always bothered me, is it possible to make things immutable?
        self.command = copy.copy(command)
        self.command.init_scope() # setup a new scope (example of why we need a new copy)
        self.command.set_query(text) # set the query string, since we already know that for arg match
        # create bound function with any arg matches
        match_and_return = iris_objects.FunctionWrapper(ArgMatch(self.command, text), self.command.title)
        # we are binding the bound function itself to whatever assignment was requested
        self.assign(match_and_return)
        return Value(match_and_return, self.context)

# This is the state machine that allows a user to CALL a function from the system
class ApplySearch(Scope, AssignableMachine):
    # "text" allows again for pre-defined querys, where we don't ask the user
    def __init__(self, question = ["What would you like to do?"], text = None):
        self.question = question
        self.function_generator = FunctionSearch(self.question, text=text)
        super().__init__()
        self.accepts_input = False
        self.init_scope()
    # because we are making one search SM that we are using multiple times, and it uses context
    # we need to reset this context in between calls
    def reset(self):
        self.reset_context()
        return self
    # can just use FunctionSearch to make the hint
    def base_hint(self, text):
        if text == "":
            return []
        return self.function_generator.hint(text)
    # ditto with docs
    def docs(self, text):
        return self.function_generator.docs(text)
    # this wraps the function retrieval automata, but passes control to the retrieved function (i.e. call it)
    def next_state_base(self, text):
        if self.read_variable("FUNCTION") == None:
            return Assign(self.gen_scope("FUNCTION"), self.function_generator).when_done(self)
        command = self.read_variable("FUNCTION").function # Wrapper
        # save a reference to the command we decided to execute
        # TODO: make an API for this!
        self.command = command.function
        return command.when_done(self.get_when_done_state())
