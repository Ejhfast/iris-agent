from ... import util
from ..model import IRIS_MODEL
from ... import state_machine as sm
from .. import command_search as cs
from ... import iris_objects
from .converters import conversion_raw, type_dict
import numpy as np
import sys

# TODO: not all of this is "basic", some of this might need to move

IRIS = IRIS_MODEL

# This is an OR combinator for convert type
def OR(tuple_list):
    for tuple in tuple_list:
        if tuple[0] == True:
            return tuple
    return False, None

# This is a helper to thread type checking through Yes/No or Select objects
# Allows you to have Yes/No to then proceed down some complex path, but also type check!
# TODO: is this 100% working?
# TODO: a bit badly named
def primitive_or_question(object, text, doing_match):
    if isinstance(object, sm.StateMachine):
        return object.convert_type(text, doing_match)
    return object == text, text

# definition of pronoun keywords
# TODO: is this the best place for this to be?
def is_pronoun(text):
    if text in ["this", "that", "these", "those", "it"]:
        return True
    return False

# this class hold basic/shared automata logic for how types interact with the Iris environment
# TODO: the "question" attribute is maybe badly named
class EnvVar(sm.AssignableMachine):
    # constructor, we are threading through by default the global IRIS command state
    # this holds info about commands registered with the environment
    def __init__(self, question="Please give me a value for {}:", iris=IRIS):
        self.iris = iris
        self.question = question
        self.converters = []
        super().__init__()

    # the initial message that will be presented to user when retrieving this type
    # the .format call allows the state machine to optionally inject the name of the variable in question
    def get_output(self):
        return [self.question.format(self.arg_name)]

    # the default error message when retriving the type based on user input fails
    def error_message(self, text):
        return ["I could not find '{}' in the environment".format(text)]

    # logic that defines what kinds of values match this type
    def is_type(self, x):
        return True

    # logic that defines what kinds of string values provided by user match this type
    def type_from_string(self, x):
        return False, None

    # logic to extract a value of this type from user input
    # "text" refers to user input
    # "doing_match" refers to whether the attempted extraction is to test templates during attempted argument matching
    # if so, we don't want to assign the value to a variable
    # more often, convert_type is called to do a binding/assignment at runtime (e.g., x <- "2"), where we do assign
    def convert_type(self, text, doing_match=False):
        # does the user input refer to a pronoun?
        if is_pronoun(text):
            if not doing_match:
                # if we're not doing template matching, write the value in __MEMORY__ to the variable in question
                self.assign(iris_objects.EnvReference("__MEMORY__"), name=text)
            # otherwise, just return the memory value, because any memory value matches the default type
            return True, iris_objects.EnvReference("__MEMORY__")
        # if not pronoun, does the text refer to a named env variable and match the default type
        elif text in self.iris.env and self.is_type(self.iris.env[text]):
            if not doing_match: self.assign(iris_objects.EnvReference(text), name=text)#self.iris.env[text], name=text)
            return True, iris_objects.EnvReference(text)
        # note, we are returning references to values above, and not concrete values, because the value pointed to by a reference can change!
        # this is important for recording logic properly in reusable ASTs
        # this means that when you are executing commands in the environment you are implicitly defining functions!
        else:
            # finally, we attempt to convert to type via string conversion methods (this won't work for the default type, but might for other types)
            success, result = self.type_from_string(text)
            if success:
                if not doing_match: self.assign(result, name=text)
                return True, result
            return False, self.error_message(text)

    # this is a wrapper around convert type that I hacked on later to support automatic type-conversion
    # (e.g., give an int when it wants a float)
    # logic for this is defined in converters.py
    def convert_type_wrap(self, text, doing_match=False):
        success, result = self.convert_type(text, doing_match)
        if success:
            return True, result
        # if normal process didn't work, we'll see about conversion
        elif text in self.iris.env:
            return True, conversion_raw(self.iris.env[text], self, self.get_when_done_state())
        return False, None

    # base_hint defines what appears in the hint/prediction box
    def base_hint(self, text):
        # we're going to ignore these magic variables
        # TODO: refactor this
        constants = ["__MEMORY__", "__MEMORY_FUNC__", "ASTS"]
        # if no text in the box, we're going to show hints
        if text == "":
            return [name for name in self.iris.env.keys() if self.convert_type(name, doing_match=True)[0] and not name in constants]
        # otherwise, we'll try to convert what's in the box to predict the future
        success, _ = self.convert_type(text, doing_match=True)
        if success:
            return ["'{}' works as an arg".format(text)]
        elif text in self.iris.env:
            return ["use '{}' as arg (not correct type)".format(text)]
        # otherwise, we're going to treat user input as another command request
        else:
            return cs.ApplySearch().hint(text)

    # next_state_base defines automata state transitions (see ../core.py)
    def next_state_base(self, text):
        # if we can get the type from user input, great
        success, result = self.convert_type_wrap(text)
        if success: return result
        # otherwise, we're going to attempt execute a new command (and wrap that in a type checking automata)
        # TODO: sometimes, this means a user executes a new command when they don't mean to (e.g., misspelling)
        # command search logic can be smarter and reject bad input in this way
        return sm.TypeCheck(self, cs.ApplySearch(text=text)).when_done(self.get_when_done_state())
        #return self.set_error(result)

# using the default type class, defining new types is relatively easy
# here is one for Integers
# TODO: Iris should possibly just have a "Number" class
class Int(EnvVar):
    # is this value an integer
    def is_type(self, x):
        if isinstance(x, int): return True
        return False
    # error message for integers
    def error_message(self, text):
        return ["I could not find '{}' in the environment or convert it to an integer. Please try again:".format(text)]
    # it is possible to convert integers from string
    def type_from_string(self, x):
        try:
            result = int(x)
            return True, result
        except:
            return False, None

# the type for floats
class Float(EnvVar):
    def is_type(self, x):
        if isinstance(x, int) or isinstance(x, float): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment or convert it to an float. Please try again:".format(text)]

    def type_from_string(self, x):
        try:
            result = float(x)
            return True, result
        except:
            return False, None

# the type for model objects (e.g. sklearn models)
class Model(EnvVar):
    # if you want to understand model objects, the place to look is ../../irisobjects.py
    def is_type(self, x):
        if isinstance(x, iris_objects.IrisModel): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment. Please try again:".format(text)]

# the type for strings
class String(EnvVar):
    def is_type(self, x):
        if isinstance(x, str): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment or convert it to an string. Please try again:".format(text)]

    # the parser extracts quoted units as well, so fet rid of any quotes
    def type_from_string(self, x):
        return True, x.replace("\"","") # sketch

# the type for numpy arrays
class Array(EnvVar):
    def is_type(self, x):
        if isinstance(x, np.ndarray): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment or convert it to an Array. Please try again:".format(text)]

# the type for lists
class List(EnvVar):
    def is_type(self, x):
        if isinstance(x, list): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment or convert it to an List. Please try again:".format(text)]

# the type for functions
# (functions are a reference to iris commands themselves!)
class Function(EnvVar):
    def is_type(self, x):
        if isinstance(x, iris_objects.FunctionWrapper): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment. Please try again:".format(text)]

# this is a somewhat annoying helper to extract lists of env vars directly from user input
# TODO: where is this still being used?
class ArgList(EnvVar):
    def is_type(self, x):
        return True, x

    def error_message(self, text):
        return ["I couldn't parse that. Please try again:".format(text)]

    def convert_type(self, text, doing_match=False):
        elements = [x.strip() for x in text.split(",")]
        if all([e in self.iris.env and self.is_type(self.iris.env[e]) for e in elements]):
            self.assign([self.iris.env[e] for e in elements])
            return True, [self.iris.env[e] for e in elements]
        return False, self.error_message(text)

# same thing as ArgList, but when you want some comma-separated strings
class StrList(EnvVar):
    def is_type(self, x):
        return True, x

    def error_message(self, text):
        return ["I couldn't parse that. Please try again:".format(text)]

    def convert_type(self, text, doing_match=False):
        elements = [x.strip() for x in text.split(",")]
        if not doing_match: self.assign(elements)
        return True, elements
        # return False, self.error_message(text)

# type for files
# TODO: should this really be in basic?
class File(EnvVar):
    def __init__(self, question="Please give me a value for {}:", iris=IRIS, binary=False):
        self.iris = iris
        self.question = question
        self.converters = []
        self.binary = binary
        super().__init__()

    # if we can open and close the name of this thing, it is a file...
    def is_type(self, x):
        read_option = "r" if not self.binary else "rb"
        try:
            f = open(x, read_option, errors='ignore')
            f.read()
            f.close()
        except:
            print(sys.exc_info())
            return False
        return True

    # this exists only for convert_type below, real file API is in irisobjects.py
    def get_content(self, x):
        read_option = "r" if not self.binary else "rb"
        with open(x, read_option, errors='ignore') as f:
            return f.read()#.encode('utf-8')

    # this will generate a file-picker UI component that the user can use to select a file
    def get_output(self):
        return [
            self.question.format(self.arg_name),
            # this maps on to a react component type
            {"type":"file_pick", "value":""},
            "You can also type in a file path below:"
        ]

    def error_message(self, text):
        return ["I couldn't find {} in the environment. Please try again.".format(text)]

    def convert_type(self, text, doing_match=False):
        if self.is_type(text):
            content = self.get_content(text)
            obj = iris_objects.IrisFile(text, content)
            self.assign(obj, name=text.split("/")[-1])
            return True, obj#)#.when_done(self.get_when_done_state())
        return False, self.error_message(text)

# type definition for a choice
# yes/no are other types/state machines or string values to match
class YesNo(sm.AssignableMachine):
    def __init__(self, question, yes=None, no=None):
        self.yes = yes
        self.no = no
        super().__init__()
        if isinstance(question, list):
            self.output = question
        else:
            self.output = [question]

    # here this type checks if ANY branch type checks
    def convert_type(self, text):
        return OR([
            primitive_or_question(self.yes, text),
            primitive_or_question(self.no, text)
        ])

    # display as hint which choice user text maps onto
    # TODO: "triggers" is a bit non-standard, get these hints standardized
    def base_hint(self, text):
        if util.verify_response(text):
            return ["triggers yes"]
        return ["triggers no"]

    # TODO: is this assigning without checking against do_match?
    def next_state_base(self, text):
        new_state = self
        if util.verify_response(text): new_state = self.yes
        else: new_state = self.no
        if not isinstance(new_state, sm.StateMachine):
            self.assign(new_state)
        return new_state

    # thread through any when_dones called on this thing
    def when_done(self, state):
        if isinstance(self.yes, sm.StateMachine):
            self.yes.when_done(state)
        if isinstance(self.no, sm.StateMachine):
            self.no.when_done(state)
        self.when_done_state = state
        return self

# some example type conversion logic
# TODO: is it possible to extract these to a different file?

# These methods are/will be redundant given changes to the number types, but leaving them now for reference
class FloatToInt(sm.AssignableMachine):
    def __init__(self, user_input):
        self.user_input = user_input
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        # TODO: try-catch?
        to_int = int(self.user_input)
        return YesNo("Would you like to convert the float {} to an int {}".format(self.user_input, to_int),
            yes=sm.ValueState(to_int, name=str(to_int)).when_done(self.get_when_done_state()),
            no=self.get_when_done_state())

type_dict["Int"].append((Float, FloatToInt))
