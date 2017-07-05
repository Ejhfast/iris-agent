from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class AddTwo(IrisCommand):
    title = "add two to {x}"
    examples = []
    argument_types = {"x":t.Int("Add two?")}
    def command(self, x):
        return x + 2
    def explanation(self, result):
        return result
_AddTwo = AddTwo()

