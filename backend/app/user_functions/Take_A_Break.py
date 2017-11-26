from iris import state_types as t
from iris import IrisCommand

from iris import iris_objects
class Take_A_Break(IrisCommand):
    title = "take {x} second break"
    examples = ["pause for {x} seconds", "rest for {x} seconds", "wait for {x} seconds", "nap for {x} seconds"]
    argument_types = {"x":t.Int("How long of a break you want to take (in second)?")}
    def command(self, x):
        #pause for x second
        import time
        time.sleep(x)
        return str(x)
    def explanation(self, result):
        return 'Iris just took {} seconds nap'.format(result)
_Take_A_Break = Take_A_Break()

