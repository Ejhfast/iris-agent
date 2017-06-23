from .model import IRIS_MODEL
from .core import StateMachine
from .basic import AssignableMachine, Assign, DoAll, Print, ValueState, Value
from . import types as t
from .. import util

class AddToIrisEnv(StateMachine):
    def __init__(self, env_name, env_value, iris=IRIS_MODEL):
        self.env_name = env_name
        self.env_value = env_value
        self.iris = iris
        super().__init__()
        self.accepts_input = False
    def get_output(self):
        return ["I saved the result as {}.".format(self.read_variable(self.env_name))]
    def next_state_base(self, text):
        self.iris.add_to_env(self.read_variable(self.env_name), self.read_variable(self.env_value))
        return Value(None, self.context)

class AddToIrisEnv2(StateMachine):
    def __init__(self, env_name, env_value, iris=IRIS_MODEL):
        self.env_name = env_name
        self.env_value = env_value
        self.iris = iris
        super().__init__()
        self.accepts_input = False
    def get_output(self):
        return []
    def next_state_base(self, text):
        self.iris.add_to_env(self.env_name, self.read_variable(self.env_value))
        return Value(None, self.context)
