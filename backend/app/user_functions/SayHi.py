from iris import state_types as t
from iris import IrisCommand

class SayHi(IrisCommand):
    title = "Hi"
    examples = ["Hi Ethan", "Hi Bin"]
    argument_types = {}
    def command(self, ):
        import random
        n0 = random.randint(0,100)
        return n0
    def explanation(self, result):
        return "Your lucky number is "+str(result)
_SayHi = SayHi()

