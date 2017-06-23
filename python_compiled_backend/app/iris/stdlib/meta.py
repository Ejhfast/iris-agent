from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util

class SaveEnv(IrisCommand):
    title = "save environment to {name}"
    examples = [ "save environment {name}",
                 "save env to {name}" ]
    help_text = [
        "This command saves the current environment (all data in the left pane).",
        "This data can be loaded later using the 'load environment' command."
    ]
    def command(self, name : t.String(question="What filename to save under?")):
        import dill as pickle
        with open(name, 'wb') as f:
            print(self.iris.env)
            pickle.dump(self.iris.serialize_state(), f)
            return "Saved to {}.".format(name)

saveEnv = SaveEnv()

class LoadEnv(IrisCommand):
    title = "load environment from {name}"
    examples = [ "load environment {name}",
                 "load env from {name}" ]
    help_text = [
        "This command loads an enviornment previously saved by Iris."
    ]
    def command(self, name : t.String(question="What filename to load?")):
        import dill as pickle
        with open(name, 'rb') as f:
            data = pickle.load(f)
            self.iris.load_state(data)
            return "Loaded environment from \"{}\".".format(name)

loadEnv = LoadEnv()

class StoreCommand(IrisCommand):
    title = "save {value} to {name}"
    examples = ["save {value} as {name}", "save that {value} to {name}" ]
    argument_types = {
        "value": t.EnvVar(),
        "name": t.String("What name would you like to save it as?")
    }
    def command(self, value, name):
        self.iris.add_to_env(name, value)
        return value

storeCommand = StoreCommand()

class RenameVar(IrisCommand):
    title = "rename {name1} to {name2}"
    examples = ["change name {value} to {name}" ]
    argument_types = {
        "name1": t.String("What is the name of the first variable?"),
        "name2": t.String("What is the name of the second variable?")
    }
    def command(self, name1, name2):
        self.iris.add_to_env(name2, self.iris.env[name1])
        self.iris.remove_from_env(name1)
        return "I renamed {} to {}.".format(name1, name2)

renameVar = RenameVar()

class RemoveVar(IrisCommand):
    title = "delete {name1}"
    examples = ["remove {name1} from environment" ]
    argument_types = {
        "name1": t.String("What is the name of the variable to remove?"),
    }
    def command(self, name1):
        self.iris.remove_from_env(name1)
        return "I removed {} from the environment.".format(name1)

removeVar = RemoveVar()
