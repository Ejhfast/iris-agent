# some complex automata that enable PBD, these are coming back eventually

# This is the current way of processing a block of expressions in the system
# depends on: basics, ApplySearch, FunctionReturn, Block
# removed for now due to issues with code generation (generating blocks)
class WorkLoop(AssignableMachine):
    def __init__(self):
        super().__init__()
        self.output = ["Entering workflow, what would you like to do?"]
    def hint(self, text):
        if text and "done" in text:
            return ["ends current workflow"]
        else:
            return ApplySearch().base_hint(text)
    def next_state_base(self, text):
        if not self.read_variable("last_command") == None:
            self.append_variable("programs", self.read_variable("last_command").program)
        if text and "done" in text:
            print("WORKLOOP", self.read_variable("programs"))
            wrapped_program = FunctionReturn(self.read_variable("last_command").value, Block(self.read_variable("programs")))
            return DoAll([
                Print(["Okay, done with workflow."]),
                ValueState(wrapped_program) #ValueState(self.read_variable("last_command"))
            ]).when_done(self.get_when_done_state())
        else:
            self.output = []#["Still in workflow. What would you like to do next?"]
            return Assign("last_command", ApplySearch(text=text)).when_done(self)

# How users define a while loop (experimental)
# depends on: basics, FunctionReturn, While (AST), ApplySearch
class WhileState(AssignableMachine):
    def __init__(self):
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        if self.read_variable("condition") == None:
            return Assign("condition", ApplySearch(question = ["Condition?"])).when_done(self)
        if self.read_variable("true_exp") == None:
            return Assign("true_exp", ApplySearch(question = ["True exp?"])).when_done(self)
        program = While(self.read_variable("condition").program, self.read_variable("true_exp").program)
        if self.read_variable("condition").value == True:
            return DoAll([
                ValueState(FunctionReturn(self.read_variable("true_exp").value, program)),
                program
            ]).when_done(self.get_when_done_state())
        return ValueState(FunctionReturn(NoneState(), program)).when_done(self.get_when_done_state())

# How user executes and If statement
# depends on: basics, IF, FunctionReturn, ApplySearch
class IfState(AssignableMachine):
    def __init__(self):
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        if self.read_variable("condition") == None:
            return Assign("condition", ApplySearch(question = ["Condition?"])).when_done(self)
        if self.read_variable("true_exp") == None:
            return Assign("true_exp", ApplySearch(question = ["True exp?"])).when_done(self)
        program = If(self.read_variable("condition").program, self.read_variable("true_exp").program)
        print("program", self.read_variable("condition").program, self.read_variable("true_exp").program)
        if self.read_variable("condition").value == True:
            return ValueState(FunctionReturn(self.read_variable("true_exp").value, program)).when_done(self.get_when_done_state())
        return ValueState(FunctionReturn(NoneState(), program)).when_done(self.get_when_done_state())

# below: old or experimental automata that may have some use as references

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
