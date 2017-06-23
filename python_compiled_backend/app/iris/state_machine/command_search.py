from .basic import StateMachine, Scope, AssignableMachine, Assign, DoAll, Print, ValueState, Value
from .model import IRIS_MODEL
from .argmatch import ArgMatch
from .. import iris_objects
from .. import util
import copy

# This is the state machine that allows a user to RETRIEVE a function from the system
# depends on: basics, iris_objects
class FunctionSearch(AssignableMachine):
    def __init__(self, question = ["What function would you like to retrieve?"], text = None, iris = IRIS_MODEL):
        self.iris = IRIS_MODEL
        super().__init__()
        self.question = question
        self.text = text
        self.output = question
        if text:
            self.output = []
            self.accepts_input = False
    def base_hint(self, text):
        predictions = self.iris.predict_commands(text, 3)
        arg_matches = [(util.first_match([util.arg_match(text, x) for x in self.iris.class2cmd[cmd[0].class_index]]), cmd[0].title) for cmd in predictions]
        return [util.replace_args(*x) for x in arg_matches]
    def next_state_base(self, text):
        if self.text:
            text = self.text
        command, score = self.iris.predict_commands(text)[0]
        self.command = copy.copy(command)
        self.command.init_scope() # setup a new scope
        self.command.set_query(text)
        match_and_return = iris_objects.FunctionWrapper(ArgMatch(self.command, text), self.command.title)
        self.assign(match_and_return)
        return Value(match_and_return, self.context)

# This is the state machine that allows a user to CALL a function from the system
# depends on: basics, FunctionSearch
class ApplySearch(Scope, AssignableMachine):
    def __init__(self, question = ["What would you like to do?"], text = None):
        self.question = question
        self.function_generator = FunctionSearch(self.question, text=text)
        super().__init__()
        self.accepts_input = False
        self.init_scope()
    def reset(self):
        self.reset_context()
        return self
    def base_hint(self, text):
        return self.function_generator.hint(text)
    def next_state_base(self, text):
        if self.read_variable("FUNCTION") == None:
            return Assign(self.gen_scope("FUNCTION"), self.function_generator).when_done(self)
        command = self.read_variable("FUNCTION").function # Wrapper
        self.command = command.function
        return command.when_done(self.get_when_done_state())
