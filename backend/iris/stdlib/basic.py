from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util
from .. import iris_objects


class GetArrayLength(IrisCommand):
    title = "get length of array {arr}"
    examples = ["array {arr} length"]
    def command(self, arr: t.Array("What array to get length of?")):
        return arr.shape[0]

getArrayLength = GetArrayLength()

class GenerateNumber(IrisCommand):
    title = "generate a random number"
    examples = [ "generate number" ]
    def command(self):
        import random
        return random.randint(0,100)

generateNumber = GenerateNumber()

# class LessThan(IrisCommand):
#     title = "{x} less than {y}"
#     examples = ["{x} < {y}", "{x} less {y}"]
#     argument_types = {
#         "x": t.Int("Give an integer value for x:"),
#         "y": t.Int("Give an integer value for y:")
#     }
#     def command(self, x, y):
#         return x < y
#
# lessThan = LessThan()

class GenerateArray(IrisCommand):
    title = "generate a random array of {n} numbers"
    examples = [ "generate numpy array of size {n}"]
    def command(self, n : t.Int("Please enter size of array:")):
        import numpy
        return numpy.random.randint(100, size=n)

generateArray = GenerateArray()

class AddTwoNumbers(IrisCommand):
    title = "add two numbers: {x} and {y}"
    examples = [ "add {x} and {y}",
                 "add {x} {y}",
                 "can you add {x} and {y}" ]
    argument_types = {
        "x": t.Float("Please enter a number for x:"),
        "y": t.Float("Please enter a number for y:")
    }
    help_text = [
        "This command performs addition on two numbers, e.g., 'add 3 and 2' will return 5"
    ]
    def command(self, x, y):
        return x + y

addTwoNumbers = AddTwoNumbers()

class GenerateFloat(IrisCommand):
    title = "generate a random float"
    examples = [ "generate float" ]
    def command(self):
        print("I am called by", self.caller.context)
        import random
        return float(random.randint(0,100))

generateFloat = GenerateFloat()

class DivideTwoNumbers(IrisCommand):
    title = "divide two numbers: {x} and {y}"
    examples = [ "divide {x} and {y}",
                 "divide {x} {y}" ]
    argument_types = {
        "x": t.Float("Please enter a number for x:"),
        "y": t.Float("Please enter a number for y:")
    }
    help_text = [
        "This command performs addition on two numbers, e.g., 'add 3 and 2' will return 5"
    ]
    def command(self, x, y):
        return x / y
    def explanation(self, val):
        return "Dividing those, I get {}".format(round(val, 6))

divideTwoNumbers = DivideTwoNumbers()

class PrintValue(IrisCommand):
    title = "print {value}"
    examples = [ "display {value}", "{value}", "show me {value}"]
    help_text = [
        "This command will display the underlying data for environment variables."
    ]
    def command(self, value : t.EnvVar()):
        # if isinstance(value, iris_objects.IrisDataframe):
        #     return value.to_matrix()
        return value

printValue = PrintValue()
