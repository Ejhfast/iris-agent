from .basic import StateMachine, Scope, AssignableMachine, Assign, DoAll, Print, ValueState, Value

# Here we are defining all the basic constructs of an AST in the Iris user-facing language
# These ASTs are themselves executable, and are generated dynamically as a user executes a program
# So to re-execute something, all we need to do is grab that AST and call it

# AST representation of If statement
# depends on: basics
class If(Scope, AssignableMachine):
    def __init__(self, condition, true_exp, continuation=None):
        self.condition = condition
        self.true_exp = true_exp
        self.continuation = continuation
        super().__init__()
        self.init_scope()
        self.accepts_input = False
    def true_continutation(self):
        if self.continuation:
            return self.continuation
        else:
            return self.get_when_done_state()
    def next_state_base(self, text):
        if self.read_variable("condition") == None:
            return Assign(self.gen_scope("condition"), self.condition).when_done(self)
        elif self.read_variable("condition").value == True:
            return self.true_exp.when_done(self.true_continutation())
        return ValueState(NoneState()).when_done(self.get_when_done_state())

# this is the AST expression of while (EXPERIMENTAL)
# depends on: If, basics
class While(AssignableMachine):
    def __init__(self, condition, true_exp):
        self.condition = condition
        self.true_exp = true_exp
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        print("BACK IN WHILE")
        # this boilerplate needs to be extracted somewhere
        condition_copy = copy.copy(self.condition)
        condition_copy.set_output()
        condition_copy.init_scope()
        true_exp_copy = copy.copy(self.true_exp)
        true_exp_copy.set_output()
        true_exp_copy.init_scope()
        return If(condition_copy, true_exp_copy, continuation=self).when_done(self.get_when_done_state())

# this is the AST form of a workloop (change name?)
# depends on: basics
class Block(AssignableMachine):
    def __init__(self, states):
        super().__init__()
        self.states = []
        self.accepts_input = False
        for i in range(0, len(states)-1):
            self.states.append(Assign("junk", states[i]))
        self.states.append(states[-1])
    def next_state_base(self, text):
        return DoAll(self.states).when_done(self.get_when_done_state())
    def get_states(self):
        return [state.assign_state for state in self.states[:-1]] + [self.states[-1]]
