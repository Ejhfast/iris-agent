from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class Median(IrisCommand):
    title = "median of {array}"
    examples = ["get the median of {array}"]
    argument_types = {"array":t.DataframeSelector("Give me a dataframe to select from?")}
    def command(self, array):
        import numpy as np
        #print(np.median(array.to_matrix(),axis=0))
        return iris_objects.IrisDataframe(column_names=array.column_names, column_types=array.column_types, data=[np.median(array.to_matrix(),axis=0)])
    def explanation(self, result):
        return result
_Median = Median()
