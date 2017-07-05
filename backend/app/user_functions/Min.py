from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class Min(IrisCommand):
    title = "minimum of {array}"
    examples = []
    argument_types = {"array":t.DataframeSelector("Select a column to get the min?")}
    def command(self, array):
        print(array.to_matrix().min(axis=0))
        import numpy as np
        return iris_objects.IrisDataframe(column_names=array.column_names, column_types=array.column_types, data=[array.to_matrix().min(axis=0)], do_conversion=False)
    def explanation(self, result):
        return result
_Min = Min()

