from iris import state_types as t
from iris import IrisCommand

class AverageArray(IrisCommand):
    title = "average {array}"
    examples = ["mean {array}"]
    argument_types = {"array":t.Array("What array do you want to average?")}
    def command(self, array):
        import numpy as np
        return np.average(array)
    def explanation(self, result):
        return "The average is {}".format(result)
_AverageArray = AverageArray()

