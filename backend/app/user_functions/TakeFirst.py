from iris import state_types as t
from iris import IrisCommand

class TakeFirst(IrisCommand):
    title = "first {l}"
    examples = ["first element of {list}"]
    argument_types = {"l":t.Array("What list?")}
    def command(self, l):
        return l[0]
    def explanation(self, result):
        return result
_TakeFirst = TakeFirst()

