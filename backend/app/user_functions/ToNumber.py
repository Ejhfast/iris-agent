from iris import state_types as t
from iris import IrisCommand

class ToNumber(IrisCommand):
    title = "{x} to number"
    examples = []
    argument_types = {"x":t.String("What to convert to a number?")}
    def command(self, x):
        try:
            out =  float(x)
        except:
            out = None
        return out
    def explanation(self, result):
        return result
_ToNumber = ToNumber()

