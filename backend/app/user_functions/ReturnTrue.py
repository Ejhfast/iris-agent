from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class ReturnTrue(IrisCommand):
    title = "return true"
    examples = []
    argument_types = {}
    def command(self, ):
        return True
    def explanation(self, result):
        return result
_ReturnTrue = ReturnTrue()

