from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class Skew(IrisCommand):
    title = "skewness of {array}"
    examples = ["how skew is {array}"]
    argument_types = {"array":t.DataframeSelector("Select a column to get the min?")}
    def command(self, array):
        from scipy.stats import skew
        return iris_objects.IrisDataframe(column_names=array.column_names, column_types=array.column_types, data=[skew(array.to_matrix(),axis=0,nan_policy='omit')])
    def explanation(self, result):
        return ["Here are the skewness values (zero = not skew, positive = left tail):", result]
_Skew = Skew()
