from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class Max(IrisCommand):
    title = "maximum of {array}"
    examples = ["max of {array}"]
    argument_types = {"array":t.DataframeSelector("Give me a dataframe to select from?")}
    def command(self, array):
        import numpy as np
        return iris_objects.IrisDataframe(column_names=array.column_names, column_types=array.column_types, data=[array.to_matrix().max(axis=0)])
    def explanation(self, result):
        return result
_Max = Max()
