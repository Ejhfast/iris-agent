from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util
from ..gencode import make_script, transform_ast

# If I want to collect and stich together functions, need
# 1: retrieved functions should be storable state machines
# 2: when user paramaterizes them, should ask what are paramaters of workflow and what are constants
# 3: should be able to generate partial function based on user response, and store that
# 4: then stitch together partial functions and ask for metadata

# Notes, I can get this (below) to work, just fancier version of jump

class TestWorkLoop(IrisCommand):
    title = "test workloop"
    argument_types = {
        "test": sm.WorkLoop()
    }
    def command(self, test):
        return test

testWorkLoop = TestWorkLoop()

class TestWhile(IrisCommand):
    title = "while statement"
    argument_types = {
        "test": sm.WhileState()
    }
    def command(self, test):
        return test

testWhile = TestWhile()

class TestIf(IrisCommand):
    title = "if statement"
    argument_types = {
        "test": sm.IfState()
    }
    def command(self, test):
        return test

testIf = TestIf()

class PokeHoles(IrisCommand):
    title = "poke holes"
    argument_types = {
        "test": sm.CallMakeHoles()
    }
    def command(self, test):
        return "Great, saved the new function."

pokeHoles = PokeHoles()

class MakeScript(IrisCommand):
    title = "convert entire interaction into a Python script"
    argument_types = {
        "fname": t.String("Where would you like to save the file?")
    }
    def command(self, fname):
        with open("{}.py".format(fname), "w") as f:
            f.write(make_script(self.iris.env["ASTS"]))
        return "Wrote file to {}.py".format(fname)

makeScript = MakeScript()

class SeeCode(IrisCommand):
    title = "inspect code for previous command"
    def command(self):
        return transform_ast(self.iris.env["__MEMORY_FUNC__"])
    def explanation(self, codestr):
        return [{"type":"code", "value":codestr}]

seeCode = SeeCode()

class MakeCommand(IrisCommand):
    title = "save last iris command as {name}"
    examples = ["save last iris command {name}"]
    argument_types = {
        "name": t.String("What would you like to call this new command?"),
    }
    def command(self, name):
        new_func = self.iris.env["__MEMORY_FUNC__"]
        new_func.title = name
        new_func.set_output()
        new_func.class_index = self.iris.add_command(new_func)
        new_func.compiled=False
        self.iris.train_model()
        return name
    def explanation(self, result):
        return "I created a new command called \"{}\"".format(result)

makeCommand = MakeCommand()
