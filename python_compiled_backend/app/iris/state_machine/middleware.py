from .core import StateMachine
from .basic import Jump, Print

class Middleware:
    def test(self, text):
        return True
    def transform(self):
        pass
    def hint(self):
        return []

def gen_print_caller(help_state):
    return lambda caller: Print([help_state]).when_done(caller)

def gen_state_caller(help_state):
    def anon(caller):
        if caller.get_when_done_state():
            return help_state.when_done(caller.get_when_done_state())
        return help_state
    return anon

class ExplainMiddleware(Middleware):
    def __init__(self, help, arg):
        if isinstance(help, StateMachine):
            self.gen_state = gen_state_caller(help.set_arg_name(arg))
        else:
            self.gen_state = gen_print_caller(help)
    def test(self, text):
        if text:
            return any([x in text for x in ["explain", "help"]])
        return False
    def transform(self, caller, state, text):
        state.clear_error()
        return self.gen_state(caller)
