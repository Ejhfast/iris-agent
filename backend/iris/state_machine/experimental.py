# old or experimental automata that may have some use as references

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

class PrintF(StateMachine):
    def __init__(self, output_f):
        self.output_f = output_f
        super().__init__()
        self.accepts_input = False
    def get_output(self):
        return [self.output_f()]
    def next_state_base(self, text):
        return Value(None, self.context)

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
