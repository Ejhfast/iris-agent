from .core import StateMachine
from .. import iris_objects
import uuid

class AssignableMachine(StateMachine):
    arg_name = None
    def assign(self, value, name=None):
        if len(self.context["assign"]) > 0:
            # print(self.context)
            curr_assign = self.context["assign"].pop()
            print("ASSIGN", curr_assign, value, name)
            self.context["ASSIGNMENTS"][curr_assign] = value
            self.context["ASSIGNMENT_NAMES"][curr_assign] = name
    def is_assignable(self):
        return True
    def set_arg_name(self, name):
        self.arg_name = name
        return self
    def string_representation(self, value):
        return str(value)

class DoAll(AssignableMachine):
    def __init__(self, states, next_state_obj=None):
        self.states = states
        for i, _ in enumerate(self.states):
            if i+1 < len(self.states):
                #if isinstance(self.states[i+1], StateMachine):
                self.states[i].when_done(self.states[i+1])
        if next_state_obj:
            self.states[-1].when_done(next_state_obj)
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        return self.states[0]
    def base_hint(self, text):
        return self.states[0].hint(text)
    def when_done(self, state):
        self.states[-1].when_done(state)
        return self
    def set_arg_name(self, name):
        for state in self.states:
            if isinstance(state, AssignableMachine):
                state.set_arg_name(name)
        return self

class Label(StateMachine):
    def __init__(self, label, next_state_obj):
        self.label = label
        self.next_state_obj = next_state_obj
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        self.context[self.label] = self.next_state_obj
        return self.next_state_obj

class Jump(StateMachine):
    def __init__(self, state_label):
        self.state_label = state_label
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        return self.context[self.state_label]
    def when_done(self, new_state):
        self.context[self.state_label].when_done(new_state)
        return self

class Print(StateMachine):
    def __init__(self, output):
        super().__init__()
        self.output = output
        self.accepts_input = False
    def next_state_base(self, text):
        return Value(None, self.context)

class PrintF(StateMachine):
    def __init__(self, output_f):
        self.output_f = output_f
        super().__init__()
        self.accepts_input = False
    def get_output(self):
        return [self.output_f()]
    def next_state_base(self, text):
        return Value(None, self.context)

class Assign(StateMachine):
    def __init__(self, variable, assign_state):
        self.variable = variable
        # if not assign_state.is_assignable():
        #     raise Exception("{} is not assignable!".format(assign_state))
        self.assign_state = assign_state
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        if isinstance(self.variable, Variable):
            self.context["assign"].append(self.variable.scope_name())
        else:
            self.context["assign"].append(self.variable)
        return self.assign_state
    def base_hint(self, text):
        return self.assign_state.hint(text)
    def when_done(self, state):
        self.assign_state.when_done(state)
        return self

class Let(StateMachine):
    def __init__(self, variable, equal=None, then_do=None):
        super().__init__()
        self.next_state_obj = then_do
        self.variable = variable
        self.equal = equal
        self.accepts_input = False
    def next_state_base(self, text):
        self.context["ASSIGNMENTS"][self.variable.scope_name()]=self.equal
        return self.next_state_obj
    def base_hint(self, text):
        return self.next_state_obj.hint(text)

class Variable(StateMachine):
    def __init__(self, name, scope=None):
        self.name = name
        self.scope = scope
        super().__init__()
        self.accepts_input = False
    def scope_name(self):
        if self.scope:
            return self.scope + "_" + self.name
        return self.name
    def next_state_base(self, text):
        # print("VALUE", self.name, self.context)
        return ValueState(self.get_value()).when_done(self.get_when_done_state())
    def get_value(self):
        return self.context["ASSIGNMENTS"][self.scope_name()]
    def get_named_value(self):
        return self.context["ASSIGNMENT_NAMES"][self.scope_name()]

class SequentialMachine:
    def __init__(self):
        self.states = []
    def add(self, state):
        self.states.append(state)
    def compile(self):
        return DoAll(self.states)

class ValueState(AssignableMachine):
    def __init__(self, value, name=None):
        self.value = value
        self.name = name
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        print(self.value, self.name)
        if isinstance(self.value, iris_objects.IrisValue):
            self.assign(self.value, name=self.value.name)
        elif self.name:
            self.assign(self.value, name=self.name)
        else:
            self.assign(self.value)
        return self.assign

class Value:
    def __init__(self, result, context):
        self.result = result
        self.context = context

class PrintVar(StateMachine):
    def __init__(self, var, func):
        self.var = var
        self.func = func
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        self.var(self.context)
        name, named_value, value = self.var.name, self.var.get_named_value(), self.var.get_value()
        return Print(self.func(name, named_value, value)).when_done(self.get_when_done_state())

class Scope:
    def init_scope(self):
        self.scope = str(uuid.uuid4()).upper()[0:10]
    def gen_scope(self, name):
        return self.scope + "_" + name
    def read_variable(self, varname):
        scope_var = self.gen_scope(varname)
        if scope_var in self.context["ASSIGNMENTS"]:
            return self.context["ASSIGNMENTS"][scope_var]
        return None
    def write_variable(self, varname, value):
        scope_var = self.gen_scope(varname)
        self.context["ASSIGNMENTS"][scope_var] = value
    def append_variable(self, varname, value):
        scope_var = self.gen_scope(varname)
        if not scope_var in self.context["ASSIGNMENTS"]:
            self.context["ASSIGNMENTS"][scope_var] = [value]
        else:
            self.context["ASSIGNMENTS"][scope_var].append(value)
    def delete_variable(self, varname):
        scope_var = self.gen_scope(varname)
        if scope_var in self.context["ASSIGNMENTS"]:
            del self.context["ASSIGNMENTS"][scope_var]
