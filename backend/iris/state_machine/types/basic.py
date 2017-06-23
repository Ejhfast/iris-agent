from ... import util
from ..model import IRIS_MODEL
from ... import state_machine as sm
from .. import command_search as cs
from ... import iris_objects
from .converters import conversion, conversion_raw, type_dict
import numpy as np

IRIS = IRIS_MODEL

apply_search = cs.ApplySearch()

def OR(tuple_list):
    for tuple in tuple_list:
        if tuple[0] == True:
            return tuple
    return False, None

def primitive_or_question(object, text, doing_match):
    if isinstance(object, sm.StateMachine):
        return object.convert_type(text, doing_match)
    return object == text, text

def is_pronoun(text):
    if text in ["this", "that", "these", "those", "it"]:
        return True
    return False

class EnvVar(sm.AssignableMachine):
    def __init__(self, question="Please give me a value for {}:", iris=IRIS):
        self.iris = iris
        self.question = question
        self.converters = []
        super().__init__()

    def string_representation(self, value):
        if isinstance(value, iris_objects.IrisValue):
            return value.name
        return str(value)

    def get_output(self):
        return [self.question.format(self.arg_name)]

    def error_message(self, text):
        return ["I could not find '{}' in the environment".format(text)]

    def is_type(self, x):
        return True

    def type_from_string(self, x):
        return False, None

    def convert_type(self, text, doing_match=False):
        if is_pronoun(text):
            if not doing_match: self.assign(iris_objects.EnvReference("__MEMORY__"), name=text)
            return True, iris_objects.EnvReference("__MEMORY__")
        elif text in self.iris.env and self.is_type(self.iris.env[text]):
            if not doing_match: self.assign(iris_objects.EnvReference(text), name=text)#self.iris.env[text], name=text)
            return True, iris_objects.EnvReference(text)#self.iris.env[text]
        else:
            success, result = self.type_from_string(text)
            if success:
                if not doing_match: self.assign(result, name=text)
                return True, result
            return False, self.error_message(text)

    def convert_type_wrap(self, text, doing_match=False):
        success, result = self.convert_type(text, doing_match)
        if success:
            return True, result
        # the True's below are sketchy
        elif text in self.iris.env:
            return True, conversion_raw(self.iris.env[text], self, self.get_when_done_state())
        return False, None

    def base_hint(self, text):
        constants = ["__MEMORY__", "__MEMORY_FUNC__", "ASTS"]
        if text == "":
            return [name for name in self.iris.env.keys() if self.convert_type(name, doing_match=True)[0] and not name in constants]
        success, _ = self.convert_type(text, doing_match=True)
        if success:
            return ["'{}' works as an arg".format(text)]
        elif text in self.iris.env:
            return ["use '{}' as arg (not correct type)".format(text)]
        else:
            return cs.ApplySearch().hint(text)

    def next_state_base(self, text):
        success, result = self.convert_type_wrap(text)
        if success: return result
        return sm.TypeCheck(self, cs.ApplySearch(text=text)).when_done(self.get_when_done_state())
        #return self.set_error(result)

class Int(EnvVar):
    def is_type(self, x):
        if isinstance(x, int): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment or convert it to an integer. Please try again:".format(text)]

    def type_from_string(self, x):
        try:
            result = int(x)
            return True, result
        except:
            return False, None

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

class Model(EnvVar):
    def is_type(self, x):
        if isinstance(x, iris_objects.IrisModel): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment. Please try again:".format(text)]

class String(EnvVar):
    def is_type(self, x):
        if isinstance(x, str): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment or convert it to an string. Please try again:".format(text)]

    def type_from_string(self, x):
        return True, x.replace("\"","") # sketch

class Array(EnvVar):
    def is_type(self, x):
        if isinstance(x, np.ndarray): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment or convert it to an Array. Please try again:".format(text)]

class Function(EnvVar):
    def is_type(self, x):
        if isinstance(x, iris_objects.FunctionWrapper): return True
        return False

    def error_message(self, text):
        return ["I could not find '{}' in the environment. Please try again:".format(text)]

class ArgList(EnvVar):
    def is_type(self, x):
        return True, x

    def string_representation(self, value):
        return 'LIST OF {}'.format(self.arg_name)

    def error_message(self, text):
        return ["I couldn't parse that. Please try again:".format(text)]

    def convert_type(self, text, doing_match=False):
        elements = [x.strip() for x in text.split(",")]
        if all([e in self.iris.env and self.is_type(self.iris.env[e]) for e in elements]):
            self.assign([self.iris.env[e] for e in elements])
            return True, [self.iris.env[e] for e in elements]
        return False, self.error_message(text)

class StrList(EnvVar):
    def is_type(self, x):
        return True, x

    def string_representation(self, value):
        return 'LIST OF {}'.format(self.arg_name)

    def error_message(self, text):
        return ["I couldn't parse that. Please try again:".format(text)]

    def convert_type(self, text, doing_match=False):
        elements = [x.strip() for x in text.split(",")]
        if not doing_match: self.assign(elements)
        return True, elements
        # return False, self.error_message(text)

class File(EnvVar):
    def __init__(self, question="Please give me a value for {}:", iris=IRIS, binary=False):
        self.iris = iris
        self.question = question
        self.converters = []
        self.binary = binary
        super().__init__()

    def is_type(self, x):
        read_option = "r" if not self.binary else "rb"
        try:
            f = open(x, read_option)
            f.read()
            f.close()
        except:
            return False
        return True

    def get_content(self, x):
        read_option = "r" if not self.binary else "rb"
        with open(x, read_option) as f:
            return f.read()#.encode('utf-8')

    def get_output(self):
        return [
            self.question.format(self.arg_name),
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

class VarName(sm.AssignableMachine):
    global_id = 0
    def __init__(self, question="Please give me a variable name"):
        super().__init__()
        self.output = [question]
    def convert_type(self, text, doing_match=False):
        return True, iris_objects.IrisId(text, VarName.global_id)
    def next_state_base(self, text):
        success, result = self.convert_type(text)
        self.assign(result, text)
        VarName.global_id += 1
        return result

class YesNo(sm.AssignableMachine):
    def __init__(self, question, yes=None, no=None):
        self.yes = yes
        self.no = no
        super().__init__()
        if isinstance(question, list):
            self.output = question
        else:
            self.output = [question]

    def string_representation(self, value):
        if isinstance(value, str) or isinstance(value, int):
            return str(value)
        return "CHOICE FOR {}".format(self.arg_name)

    def convert_type(self, text):
        return OR([
            primitive_or_question(self.yes, text),
            primitive_or_question(self.no, text)
        ])

    def base_hint(self, text):
        if util.verify_response(text):
            return ["triggers yes"]
        return ["triggers no"]

    def next_state_base(self, text):
        new_state = self
        if util.verify_response(text): new_state = self.yes
        else: new_state = self.no
        if not isinstance(new_state, sm.StateMachine):
            self.assign(new_state)
        return new_state

    def when_done(self, state):
        if isinstance(self.yes, sm.StateMachine):
            self.yes.when_done(state)
        if isinstance(self.no, sm.StateMachine):
            self.no.when_done(state)
        self.when_done_state = state
        return self

# conversion

class FloatToInt(sm.AssignableMachine):
    def __init__(self, user_input):
        self.user_input = user_input
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        to_int = int(self.user_input)
        return YesNo("Would you like to convert the float {} to an int {}".format(self.user_input, to_int),
            yes=sm.ValueState(to_int, name=str(to_int)).when_done(self.get_when_done_state()),
            no=self.get_when_done_state())

type_dict["Int"].append((Float, FloatToInt))

class Args(sm.AssignableMachine):
    def __init__(self, arg_name):
        self.arg_name = arg_name
        super().__init__()
        self.accepts_input = False
