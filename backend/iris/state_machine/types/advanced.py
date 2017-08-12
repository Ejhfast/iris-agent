from . import util
from ..model import IRIS_MODEL
from ... import state_machine as sm
from .. import command_search as cs
from . import iris_objects
from .basic import EnvVar, YesNo, OR, primitive_or_question
from .converters import type_dict
import numpy as np

IRIS = IRIS_MODEL

# type class for dataframe objects, see irisobjects.js for more
class Dataframe(EnvVar):
    def is_type(self, x):
        if isinstance(x, iris_objects.IrisDataframe):
            return True
        return False
    def error_message(self, text):
        return ["I could not find dataframe {} in the environment.".format(text)]
    def type_from_string(self, text):
        return False, None

# type converter for dataframe objects
# TODO: this may not be important now that iris commands are becoming so dataframe-centric
class DataframeToArray(sm.AssignableMachine):
    def __init__(self, user_input):
        self.user_input = user_input
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        print("in to array")
        self_ref = self
        class GetColumn(sm.AssignableMachine):
            def __init__(self):
                self.dataframe = self_ref.user_input
                super().__init__()
                self.output = [
                    "Sure, here are the columns in that dataframe:",
                    {"type":"data", "value":util.prettify_data(self.dataframe.column_names)},
                    "Which column would you like to select to use as an array?"
                ]
            def base_hint(self, text):
                if text in self.dataframe.column_names:
                    return ["'{}' is a valid column".format(text)]
                return []
            def next_state_base(self, text):
                self.assign(self.dataframe.get_column(text), name=text)
                return sm.Print(["Great, I'm using {}".format(text)]).when_done(self.get_when_done_state())
        return YesNo("I need an array but you've given me a dataframe. Would you to select a column from the dataframe to use as an array?",
            yes=GetColumn().when_done(self.get_when_done_state()),
            no=self.get_when_done_state())

type_dict["Array"].append((Dataframe, DataframeToArray))

# TODO: add scope...
# the dataframe selector type generates a column selection interaction
class DataframeSelector(sm.Scope, sm.AssignableMachine):
    def __init__(self, question, dataframe = None, iris = IRIS_MODEL):
        super().__init__()
        self.question = question
        self.dataframe = dataframe
        self.accepts_input = False
        self.show_ouput = True
        self.init_scope()
        self.iris = iris
    def get_output(self):
        dataframe = self.read_variable("dataframe") # we are assuming EnvReference now...
        if dataframe and self.show_ouput:
            print("showing output")
            return [
                self.question,
                {"type": "collection_select", "value": dataframe.get_value(IRIS_MODEL).generate_spreadsheet_data() }
            ]
        return []
    def convert_type(self, x):
        return False, None
    def expose_state(self):
        return {"dataframe": self.caller.read_variable("dataframe").get_value(self.iris)}
    # here the hint will verify whether the user has selected a valid set of columns
    def base_hint(self, text):
        dataframe = self.read_variable("dataframe")
        if dataframe != None:
            possible_columns = [x.strip() for x in text.split(",")]
            if all([col in dataframe.get_value(self.iris).columns() for col in possible_columns]):
                return ["your selection is a valid set of columns"]
        return cs.ApplySearch(caller_context=self).hint(text)
    def next_state_base(self, text):
        print("in next_state DataframeSelector")
        # if we passed this a dataframe ref already, no need to ask user
        if self.read_variable("dataframe") == None and self.dataframe != None:
            print("already have dataframe ref")
            print(self.caller_context['ASSIGNMENTS'].keys())
            self.accepts_input = True
            return sm.Assign(self.gen_scope("dataframe"), sm.ValueState(self.caller_context['ASSIGNMENTS'][self.gen_caller_scope(self.dataframe)])).when_done(self)
        # otherwise ask user
        elif self.read_variable("dataframe") == None:
            print("asking user for dataframe ref")
            self.accepts_input = True
            return sm.Assign(self.gen_scope("dataframe"), Dataframe(self.question)).when_done(self)
        # handle processing of composed call
        elif self.read_variable("function_return") != None:
            print("did we see state?", self.read_variable("function_return"))
            if isinstance(self.read_variable("function_return").value, iris_objects.IrisDataframe):
                new_df = self.read_variable("function_return").value
                selection = new_df.copy_frame(new_df.columns())
                self.assign(selection)
                dataframe = self.delete_variable("dataframe")
                self.accepts_input = False
                self.show_ouput = True
                return selection
            else:
                text = self.read_variable("function_return").value
                self.delete_variable("function_return")
                self.accepts_input = True
        # otherwise we have already asked user
        dataframe = self.read_variable("dataframe").get_value(IRIS_MODEL)
        print(self.read_variable("dataframe"))
        print(dataframe)
        print("current text", text)
        possible_columns = [x.strip() for x in text.split(",")]
        if all([col in dataframe.columns() for col in possible_columns]):
            print("matching...")
            selection = dataframe.copy_frame(possible_columns)
            self.assign(selection)
            dataframe = self.delete_variable("dataframe")
            self.accepts_input = False
            self.show_ouput = True
            return selection
        # TODO: type checking here??
        # pass self as caller_context because this is a fancy type! (basically a command itself)
        print("no match so calling command")
        self.accepts_input = False
        self.show_ouput = False
        return sm.Assign(self.gen_scope("function_return"), cs.ApplySearch(text=text, caller_context=self)).when_done(self)

# the select class allows a user to choose among some number of options
# TODO: improve the visual representation of this!
class Select(sm.AssignableMachine):
    def __init__(self, question="Please choose from one of the following:", options={}, option_info={}, default=None):
        super().__init__()
        self.default = default
        self.id2option = {}
        self.sent2id = {}
        option_keys = sorted(options.keys())
        question_text = []
        for i,k in enumerate(option_keys):
            self.id2option[i] = options[k]
            self.sent2id[k] = i
            question_text.append(k) #"{}: {}".format(i,k))
            if options[k] in option_info:
                for m in option_info[options[k]]:
                    question_text.append({"type":"explain", "value":m})
        # question_text.append("Would you like any of these?")
        self.output = question_text
        self.question = question

    def get_output(self):
        # is there a named variable we are asking for, otherwise use generic message
        # arg_name is some magic inherited by AssignableMachine
        if self.arg_name != None:
            message = self.question.format(self.arg_name)
            return [message]# + self.output
        return [self.question]# + self.output

    def error_message(self, text):
        return ["{} is not a valid option".format(text)]

    # the most conservative thing is to take the OR of any component type value under matching logic
    # TODO: is this broken? matching on selects might be having some problems
    def convert_type(self, text, doing_match=False):
        return OR([primitive_or_question(value, text, doing_match) for _, value in self.id2option.items()])

    # hint will display the choice the user is making
    def base_hint(self, text):
        sort, choice = util.word_overlap(text, self.sent2id)
        return [{"text":sort[0], "style":"c0"}] + sort[1:]
        # success, choice = util.extract_number(text)
        # if success:
        #     value = self.id2option[choice]
        #     if isinstance(value, str):
        #         return ["{}".format(value)]
        #     return ["choice {}".format(choice)]
        # return []

    def next_state_base(self, text):
        new_state = self
        sort, choice = util.word_overlap(text, self.sent2id)
        if choice in self.id2option:
            new_state = self.id2option[choice]
            # if we've hit ground, do assignment
            if not isinstance(new_state, sm.StateMachine):
                self.assign(new_state, new_state)
            return new_state
        return self.set_error(self.error_message(text))

    # need to pass any when_dones on this down to component state machines, if any
    def when_done(self, next_state):
        for id, state in self.id2option.items():
            if isinstance(state, sm.StateMachine):
                state.when_done(next_state)
        self.when_done_state = next_state
        return self
