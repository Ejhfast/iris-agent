from iris import state_types as t
from iris import IrisCommand

class ToString(IrisCommand):
    title = "{x} to string"
    examples = []
    argument_types = {"x":t.Float("What float to convert to string?")}
    def command(self, x):
        return str(x)
    def explanation(self, result):
        return result
_ToString = ToString()

