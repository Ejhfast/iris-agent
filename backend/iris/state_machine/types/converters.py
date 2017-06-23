from ..model import IRIS_MODEL
from ... import state_machine as sm
from ... import iris_objects
from collections import defaultdict

type_dict = defaultdict(list)

def conversion(user_input, desired_type, when_done_state):
    possible_types = type_dict[desired_type.__class__.__name__]
    for t in possible_types:
        t_class, convert_machine = t
        succ, result = t_class().convert_type(user_input)
        if succ:
            if isinstance(result, iris_objects.EnvReference):
                result = result.get_value(IRIS_MODEL)
            return convert_machine(result).when_done(when_done_state)
    return sm.Print(["I'm sorry, that didn't match the requested type."]).when_done(when_done_state)

def conversion_raw(value, desired_type, when_done_state):
    if isinstance(value, iris_objects.EnvReference):
        value = value.get_value(IRIS_MODEL)
    possible_types = type_dict[desired_type.__class__.__name__]
    print(possible_types)
    for t in possible_types:
        t_class, convert_machine = t
        print(t_class, value)
        if t_class().is_type(value):
            return convert_machine(value).when_done(when_done_state)
    return sm.Print(["I'm sorry, that didn't match the requested type."]).when_done(when_done_state)
