from collections import defaultdict
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
from . import iris_objects

class IrisBase:

    def __init__(self):
        self.cmd2class = {}
        self.class2cmd = defaultdict(list)
        self.class_functions = {}
        self.model = LogisticRegression()
        self.vectorizer = CountVectorizer()
        self.env = {}
        self.env_order = {}
        self.plots = {}
        self.history = {"history": [], "currentConvo": { 'messages': [], 'title': None, 'hidden': False, 'id': 0, 'args': {} }}
        self.inputs = []
        self.past_inputs = []

    def add_to_env(self, name, result):
        self.env[name] = result
        self.env_order[name] = len(self.env_order)
        if isinstance(result, iris_objects.IrisValue):
            if not result.name or result.name == "__MEMORY__":
                result.name = name

    def remove_from_env(self, name):
        del self.env[name]
        del self.env_order[name]

    def gen_plot_id(self, name):
        if not name in self.plots:
            self.plots[name] = len(self.plots)
        return self.plots[name]

    def set_history(self, request):
        self.history = request["conversation"]

    def serialize_state(self):
        return {"env":self.env, "env_order":self.env_order, "history":self.history}

    def load_state(self, data):
        self.env = data["env"]
        self.env_order = data["env_order"]
        self.history = data["history"]

    def add_command(self, command):
        print("REGISTERING AS", command.title, command.training_examples())
        class_index = len(self.class_functions)
        self.class_functions[class_index] = command
        for command_string in command.training_examples():
            lower_command = command_string.lower()
            self.cmd2class[lower_command] = class_index
            self.class2cmd[class_index].append(lower_command)
        return class_index

    def iris(self):
        return self

    def train_model(self):
        x_docs, y = zip(*[(k, v) for k,v in self.cmd2class.items()])
        x = self.vectorizer.fit_transform(x_docs)
        self.model.fit(x,y)

    def predict_input(self, query):
        return self.model.predict_proba(self.vectorizer.transform([query]))

    def learn(self, cmd, bindings):
        if cmd.query == None: return False, None
        query_words = cmd.query.lower().split()
        out = []
        inverse_bindings = {str(v):k for k,v in bindings.items()}
        for w in query_words:
            if w in inverse_bindings:
                out.append("{"+inverse_bindings[w]+"}")
            else:
                out.append(w)
        new_command_string = " ".join(out)
        if new_command_string in self.cmd2class: return False, None
        self.cmd2class[new_command_string] = cmd.class_index
        self.class2cmd[cmd.class_index].append(new_command_string)
        self.train_model()
        return True, new_command_string

    def predict_commands(self, text, n=1):
        predictions = self.predict_input(text)[0].tolist()
        sorted_predictions = sorted([(self.class_functions[i],x) for i,x in enumerate(predictions)], key=lambda x: x[-1], reverse=True)
        return sorted_predictions[:n]
