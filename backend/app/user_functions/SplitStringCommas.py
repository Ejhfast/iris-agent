from iris import state_types as t
from iris import IrisCommand

class SplitStringCommas(IrisCommand):
    title = "split string {str} on commas"
    examples = ["splitting string"]
    argument_types = {"str":t.String("What string do you want to split on commas?")}
    def command(self, str):
        return str.split(",")
    def explanation(self, result):
        return [result]
_SplitStringCommas = SplitStringCommas()

