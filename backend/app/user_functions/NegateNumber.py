from iris import state_types as t
from iris import IrisCommand

class NegateNumber(IrisCommand):
    title = "negate {x}"
    examples = ["make {x} negative"]
    argument_types = {"x":t.Float("What number to negate?")}
    def command(self, x):
        return x * -1
    def explanation(self, result):
        return result
_NegateNumber = NegateNumber()

