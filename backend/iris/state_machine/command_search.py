from .basic import StateMachine, Scope, AssignableMachine, Assign, DoAll, Print, ValueState, Value
from .model import IRIS_MODEL
from .argmatch import ArgMatch
from .. import iris_objects
from .. import util
import copy

# helper to walk over match results (if there are multiple possible matches) and return bindings of first
def first_match(lst):
    for tup in lst:
        if tup[0]: # is it a match
            return tup[1] # then return the bindings
    return {}

# given a dictionary of bindings, replace words in text (between "{}")
def replace_args(bindings, text):
    out = []
    for word in util.split_line(text, delim=" "):
        if util.is_arg(word):
            word_ = word[1:-1]
            if word_ in bindings:
                out.append("{"+bindings[word_]+"}")
            else:
                out.append(word)
        else:
            out.append(word)
    return " ".join(out)

# This is the state machine that allows a user to RETRIEVE a command from the system
# Basically, supporting first-class Iris commands
class FunctionSearch(AssignableMachine):
    # "text" means we will use a known query, otherwise this SM will ask user
    def __init__(self, question = ["What function would you like to retrieve?"], text = None, class_index = None, caller_context = None, iris = IRIS_MODEL):
        if caller_context:
            print("searching with context", caller_context)
        self.iris = IRIS_MODEL
        super().__init__()
        self.question = question
        self.text = text
        self.class_index = class_index
        self.output = question
        self.caller_context = caller_context
        # not going to do any IO if we know what we're looking for
        if text or class_index:
            self.output = []
            self.accepts_input = False
    def set_class_index(self, index):
        self.class_index = index
        self.accepts_input = False
        return self
    def clear_class_index(self):
        self.class_index = None
        self.accepts_input = (self.text == None)
        return self
    # hint will show a preview of what commands will be retrieved
    # TODO: clean up this styling...
    def base_hint(self, text):
        if self.caller_context == None:
            predictions = self.iris.predict_commands(text, n=3)
        else:
            predictions = self.iris.predict_commands(text, n=3, context=self.caller_context)
        arg_matches = [(first_match([util.arg_match(text, x) for x in self.iris.class2cmd[cmd[0].class_index]]), cmd[0].title) for cmd in predictions]
        with_replace_args = [{"style":"normal", "text":replace_args(*x[0]), "id":x[1][0].class_index} for x in zip(arg_matches, predictions)]
        if len(with_replace_args) > 0:
            with_replace_args[0]["style"] = "c0"
        return with_replace_args
    # return docs object for a search
    # TODO: is this being used anywhere?
    def docs(self, text):
        prediction = self.iris.predict_commands(text, n=1)[0]
        return prediction[0].docs()
    # here is how we retrieve and assign the desired function
    def next_state_base(self, text):
        if self.text:
            text = self.text
        if self.class_index:
            command = self.iris.get_command_by_class_index(self.class_index)
        else:
            # command, score = self.iris.predict_commands(text)[0]
            if self.caller_context == None:
                command, score = self.iris.predict_commands(text, n=3)[0]
            else:
                command, score = self.iris.predict_commands(text, n=3, context=self.caller_context)[0]
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
    def __init__(self, question = ["What would you like to do?"], text = None, caller_context = None, class_index = None):
        self.question = question
        self.function_generator = FunctionSearch(self.question, text=text, class_index = class_index, caller_context = caller_context)
        super().__init__()
        self.accepts_input = False
        self.caller_context = caller_context
        self.init_scope()
    def set_class_index(self, index):
        self.function_generator.set_class_index(index)
        return self
    # because we are making one search SM that we are using multiple times, and it uses context
    # we need to reset this context in between calls
    def reset(self):
        self.reset_context()
        self.function_generator.clear_class_index()
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
        self.command = command.function.set_caller(self.caller_context)
        return command.when_done(self.get_when_done_state())
