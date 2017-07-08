from .basic import StateMachine, Scope, AssignableMachine, Assign, DoAll, Print, ValueState, Value

# Here we are defining all the basic constructs of an AST in the Iris user-facing language
# These ASTs are themselves executable, and are generated dynamically as a user executes a program
# So to re-execute something, all we need to do is grab that AST and call it

# The difference between these ASTs and the logic in expression.py that implements automata for If etc.
# Is that the automata in expression.py are designed to interact with the user (e.g., "What should I use to execute the condition?")
# Whereas the automata here simply store a representation of what happened, which can be re-executed

# AST representation of If statement
class If(Scope, AssignableMachine):
    def __init__(self, condition, true_exp, continuation=None):
        # condition to check
        self.condition = condition
        # do if true
        self.true_exp = true_exp
        # continue after true (optional)
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
        # if nothing has been assigned, execute condition and loop back to self
        if self.read_variable("condition") == None:
            return Assign(self.gen_scope("condition"), self.condition).when_done(self)
        # otherwise if condition is true, execute body and move to continuation
        # TODO: why this structure, why you we pass an optional continutation in? To implement while...
        elif self.read_variable("condition").value == True:
            return self.true_exp.when_done(self.true_continutation())
        # otherwise, we're done
        return ValueState(None).when_done(self.get_when_done_state())

# this is the AST expression of while (EXPERIMENTAL)
class While(AssignableMachine):
    def __init__(self, condition, true_exp):
        # condition
        self.condition = condition
        # what to keep doing if true
        self.true_exp = true_exp
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        # this boilerplate needs to be extracted somewhere
        # make a copy of the condition, as it will be rexecuted
        condition_copy = copy.copy(self.condition)
        condition_copy.set_output() # TODO: are these necessary
        condition_copy.init_scope()
        # ditto for true_exp
        true_exp_copy = copy.copy(self.true_exp)
        true_exp_copy.set_output()
        true_exp_copy.init_scope()
        # while = if that loops back to self
        return If(condition_copy, true_exp_copy, continuation=self).when_done(self.get_when_done_state())

# this is the AST form of a workloop (TODO: change name?)
class Block(AssignableMachine):
    def __init__(self, states):
        super().__init__()
        self.states = []
        self.accepts_input = False
        for i in range(0, len(states)-1):
            # so it is very likely that some consitutent automata in a block are going to do assignment
            # but we want the block to only return the last value, so we are going to wrap all automata
            # with logic that eats up any attempted assignment
            self.states.append(Assign("__JUNK__", states[i]))
        self.states.append(states[-1])
    def next_state_base(self, text):
        return DoAll(self.states).when_done(self.get_when_done_state())
    def get_states(self):
        return [state.assign_state for state in self.states[:-1]] + [self.states[-1]]
