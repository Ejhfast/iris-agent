from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class ReturnFalse(IrisCommand):
    title = "return false"
    examples = []
    argument_types = {}
    def command(self, ):
        return False
    def explanation(self, result):
        return result
_ReturnFalse = ReturnFalse()

