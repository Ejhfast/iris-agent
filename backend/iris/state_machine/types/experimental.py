from . import util
from ..model import IRIS_MODEL
from ... import state_machine as sm
from .. import command_search as cs
from . import iris_objects
from .basic import EnvVar, YesNo, OR, primitive_or_question
from .converters import type_dict
# for statistical machine
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer

# these classes are not being used right now, but might be useful in the future

class StatisticalState(sm.AssignableMachine):
    def __init__(self, question, class2example):
        self.class2example = class2example
        self.titles = {}
        super().__init__()
        if isinstance(question, list):
            self.output = question
        else:
            self.output = [question]
        self.model = LogisticRegression()
        self.vectorizer = CountVectorizer()
        self.train()

    def train(self):
        docs = []
        classes = []
        self.transitions = {}
        for i, title in enumerate(self.class2example.keys()):
            examples = self.class2example[title]["examples"]
            self.transitions[i] = self.class2example[title]["state"]
            self.titles[i] = title
            for example in examples:
                docs.append(example)
                classes.append(i)
        X = self.vectorizer.fit_transform(docs)
        self.model.fit(X, classes)

    def base_hint(self, text):
        next_state = self.predict(text)
        return [self.titles[next_state]]

    def predict(self, text):
        x = self.vectorizer.transform([text])
        return self.model.predict(x)[0]

    def next_state_base(self, text):
        next_state = self.predict(text)
        if not isinstance(self.transitions[next_state], sm.StateMachine):
            self.assign(self.transitions[next_state])
        return self.transitions[next_state]
