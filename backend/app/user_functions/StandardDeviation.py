from iris import state_types as t
from iris import IrisCommand

class StandardDeviation(IrisCommand):
	title = "standard deviation of {array}"
	examples = ["std {array}"]
	argument_types = {"array":t.Array("What is the array you want to analyze?")}
	def command(self, array):
		import numpy as np
		return np.std(array)
	def explanation(self, result):
		return "The standard deviation is {}!".format(result)
_StandardDeviation = StandardDeviation()

