from collections import defaultdict
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
from . import iris_objects

# checks whether we have at least one exact match between a command's examples and user query
# shortcut for now to remove junk responses from the hint pane
def has_subword(cmd, text):
    cmd_words = set(cmd.title.lower().split())
    for ex in cmd.examples:
        for word in ex.lower().split():
            cmd_words.add(word)
    for word in text.lower().split():
        if word in cmd_words:
            return True
    return False

# this is a global store that handles what commands are registered in the system
# and what variables exist in the environment
# it also handles basic logic for mapping queries onto commands and learning from user queries
class IrisBase:
    def __init__(self):
        self.class2index = {} # class string to index
        self.cmd2class = {} # example string to index
        self.class2cmd = defaultdict(list) # index to examples
        self.class_functions = {} # index to command
        self.model = LogisticRegression() # classification model to map text to class
        self.vectorizer = CountVectorizer() # embedding model for text
        self.env = {} # enviornment store
        self.env_order = {} # keep track of order in which things are added to environment
        self.learning = True # should the model learn from user interactions
        # we are also keeping track of convo history, so that env does not change on e.g. browser refesh
        # TODO: this is a bit hacky, literally storing react data
        self.history = {"history": [], "currentConvo": { 'messages': [], 'title': None, 'hidden': False, 'id': 0, 'args': {} }}

    # add "result" to env under "name"
    def add_to_env(self, name, result):
        self.env[name] = result
        self.env_order[name] = len(self.env_order)
        # if isinstance(result, iris_objects.IrisValue):
        #     if not result.name or result.name == "__MEMORY__":
        #         result.name = name

    # remove value under "name" from env
    def remove_from_env(self, name):
        del self.env[name]
        del self.env_order[name]

    # set new history object, as passed from frontend
    # TODO: as above, super hacky
    def set_history(self, request):
        self.history = request["conversation"]

    # serialize state of iris env for saving and reloading later
    def serialize_state(self):
        return {"env":self.env, "env_order":self.env_order, "history":self.history}

    # load env from serialized data
    def load_state(self, data):
        self.env = data["env"]
        self.env_order = data["env_order"]
        self.history = data["history"]

    # register new iris command with the env and model
    def add_command(self, command):
        # if the name of class is the same as something we already know about, going to overwrite
        if not command.__class__.__name__ in self.class2index:
            class_index = len(self.class_functions)
            self.class_functions[class_index] = command
            self.class2index[command.__class__.__name__] = class_index
            for command_string in command.training_examples():
                lower_command = command_string.lower()
                self.cmd2class[lower_command] = class_index
                self.class2cmd[class_index].append(lower_command)
        else:
            # map to new command
            class_index = self.class2index[command.__class__.__name__]
            self.class_functions[class_index] = command
            # TODO: need to update examples as well! remove old and replace with new
        return class_index

    # lookup the command by its class index
    def get_command_by_class_index(self, index):
        return self.class_functions[index]

    # TODO: is anything using this?
    def iris(self):
        return self

    # re-train the model
    def train_model(self):
        x_docs, y = zip(*[(k, v) for k,v in self.cmd2class.items()])
        x = self.vectorizer.fit_transform(x_docs)
        self.model.fit(x,y)

    # get output class predictions given user input query
    def predict_input(self, query):
        return self.model.predict_proba(self.vectorizer.transform([query]))

    # should the iris model learn from new user inputs?
    def set_learning(self, bool):
        self.learning = bool
        return self

    # learn from a new example of user input that mapped on to a class
    # "bindings" is a dict that maps argument names onto a string representation of their value
    # e.g., x => "2" or y => "my_num"
    def learn(self, cmd, bindings):
        if cmd.query == None or self.learning == False: return False, None
        query_words = cmd.query.lower().split()
        out = []
        inverse_bindings = defaultdict(list)
        for k,v in bindings.items():
            inverse_bindings[str(v)].append(k)
        # inverse_bindings = {str(v):k for k,v in bindings.items()}
        for w in query_words:
            if w in inverse_bindings:
                out.append("{"+inverse_bindings[w].pop()+"}")
            else:
                out.append(w)
        new_command_string = " ".join(out)
        if new_command_string in self.cmd2class: return False, None
        self.cmd2class[new_command_string] = cmd.class_index
        self.class2cmd[cmd.class_index].append(new_command_string)
        self.train_model()
        return True, new_command_string

    # given query (text) produce sorted list of (command, prob)
    def predict_commands(self, text, n=1):
        predictions = self.predict_input(text)[0].tolist()
        sorted_predictions = sorted([(self.class_functions[i],x) for i,x in enumerate(predictions) if has_subword(self.class_functions[i], text)], key=lambda x: x[-1], reverse=True)
        return sorted_predictions[:n]
