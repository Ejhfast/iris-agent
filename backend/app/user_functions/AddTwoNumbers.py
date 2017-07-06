from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class AddTwoNumbers(IrisCommand):
    title = "add two numbers: {x} and {y}"
    examples = ["add {x} and {y}", "add {x} {y}", "can you add {x} and {y}"]
    argument_types = {"y":t.Float("Please enter a number for y:"),"x":t.Float("Please enter a number for x:")}
    def command(self, y, x):
        return x + y
    def explanation(self, result):
        return "The sum is {}".format(result)
_AddTwoNumbers = AddTwoNumbers()

