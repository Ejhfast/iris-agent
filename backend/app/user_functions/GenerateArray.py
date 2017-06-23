from iris import state_types as t
from iris import IrisCommand

class GenerateArray(IrisCommand):
    title = "generate a random array of {n} numbers"
    examples = ["generate numpy array of size {n}"]
    argument_types = {"n":t.Int("Please enter size of array:")}
    def command(self, n):
        import numpy
        return numpy.random.randint(100, size=n)
    def explanation(self, result):
        return ["Here are the numbers", result]
_GenerateArray = GenerateArray()

