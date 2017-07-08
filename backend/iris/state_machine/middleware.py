from .core import StateMachine
from .basic import Print

#
class Middleware:
    def test(self, text):
        return True
    def transform(self):
        pass
    def hint(self):
        return []

# print out a help message then return to caller (store help_state in closure)
def gen_print_caller(help_state):
    return lambda caller: Print([help_state]).when_done(caller)

# execute a help automata then return to caller (store help_state in closure)
def gen_state_caller(help_state):
    def anon(caller):
        if caller.get_when_done_state():
            return help_state.when_done(caller.get_when_done_state())
        return help_state
    return anon

# TODO: given docs, likely don't need this
class ExplainMiddleware(Middleware):
    def __init__(self, help, arg):
        # call appropriate helper function to trap desired behavior in a closure
        if isinstance(help, StateMachine):
            self.gen_state = gen_state_caller(help.set_arg_name(arg))
        else:
            self.gen_state = gen_print_caller(help)
    # trigger if text contains explain/help
    def test(self, text):
        if text:
            return any([x in text for x in ["explain", "help"]])
        return False
    # "state" is the state we would otherwise go to
    # "text" the original user input text
    def transform(self, caller, state, text):
        # state may have generated an error from processing weird user input (e.g., "help")
        # clear that
        # TODO: this explicit error logic seems like it can be removed
        # errors are currently only for non-checking types that don't map onto another command call
        # more often to just execute a new/wrong command, which is a different problem...
        state.clear_error()
        # here is the automata that will be executed
        return self.gen_state(caller)
