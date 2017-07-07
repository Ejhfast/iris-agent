from ..model import IRIS_MODEL
from ... import state_machine as sm
from ... import iris_objects
from collections import defaultdict

# this is a global dictionary of type converters, imported and appended to across files
type_dict = defaultdict(list)

# this looks up type converters that can convert a value into the desired type
# TODO: change name? why raw?
def conversion_raw(value, desired_type, when_done_state):
    if isinstance(value, iris_objects.EnvReference):
        value = value.get_value(IRIS_MODEL)
    # look up possible converters
    possible_types = type_dict[desired_type.__class__.__name__]
    for t in possible_types:
        t_class, convert_machine = t
        # is value of class we can convert from?
        if t_class().is_type(value):
            return convert_machine(value).when_done(when_done_state)
    return sm.Print(["I'm sorry, that didn't match the requested type."]).when_done(when_done_state)
