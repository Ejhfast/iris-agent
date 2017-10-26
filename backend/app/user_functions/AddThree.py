from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class AddThree(IrisCommand):
    title = "add three numbers {x} {y} {z}"
    examples = ["add three"]
    argument_types = {"x":t.Int("first int"),"y":t.Int("second int"),"z":t.Int("third int")}
    def command(self, x, y, z):
        return x + y + z
    def explanation(self, result):
        return result
_AddThree = AddThree()

