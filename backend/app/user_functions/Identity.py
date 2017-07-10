from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class Identity(IrisCommand):
    title = "identity function {x}"
    examples = []
    argument_types = {"x":t.Int("What value?")}
    def command(self, x):
        return x
    def explanation(self, result):
        return result
_Identity = Identity()

