from iris import state_types as t
from iris import IrisCommand

class CountCharacters(IrisCommand):
    title = "count characters in {string}"
    examples = ["{string} length", "char in {string}"]
    argument_types = {"string":t.String("What string to count characters for?")}
    def command(self, string):
        return len(string)
    def explanation(self, result):
        return result
_CountCharacters = CountCharacters()

