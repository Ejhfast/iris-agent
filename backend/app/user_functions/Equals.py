from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class Equals(IrisCommand):
    title = "{x} equals {y}"
    examples = ["eq {x} {y}", "equal {x} {y}"]
    argument_types = {"x":t.Int("What is the first number?"),"y":t.Int("What is the second number?")}
    def command(self, x, y):
        return x == y
    def explanation(self, result):
        return result
_Equals = Equals()

