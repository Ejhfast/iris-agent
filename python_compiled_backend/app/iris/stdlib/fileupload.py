from iris import iris_objects
from iris import state_types as t
from iris import state_machine as sm
from iris import util
import csv

split_line = util.split_line

def check_file_header(file_str, delim=","):
    first_line = file_str.split("\n")[0]
    cols = [x.lower() for x in split_line(first_line)]
    types = rows_and_types(cols)
    if len(set(types)) > 1:
        return False, cols
    return True, cols

def detect_data_type(data):
    try:
        float(data)
        return "Number"
    except:
        if len(data.split()) > 1:
            return "Text"
        else:
            return "Categorical"

def rows_and_types(cols):
    return [detect_data_type(x) for x in cols]

class Done(sm.StateMachine):
    def __init__(self):
        super().__init__()
        self.output = ["Great, I've loaded in the dataframe."]
        self.accepts_input = False
    def next_state_base(self, next):
        filename = self.read_variable("loaded_file").name
        dataframe = iris_objects.IrisDataframe(filename, self.context["headers"], self.context["types"], self.context["data"])
        return sm.ValueState(dataframe).when_done(self.get_when_done_state())

class SetIndex(sm.StateMachine):
    def __init__(self, index):
        self.index = index
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        self.context["types"][self.index] = self.read_variable("category_select")
        return sm.DoAll([
            sm.Print([
                "Great, I've set {} to {}.".format(self.context["headers"][self.index], self.read_variable("category_select")),
            ]),
            CheckTypes(force_check=True)
        ]).when_done(self.get_when_done_state())

class ChangeIndex(sm.StateMachine):
    def __init__(self):
        super().__init__()
        self.output = ["If you'd like to change something, give me the column index:"]
    def next_state_base(self, text):
        success, index = util.extract_number(text)
        column_names = {i:k for i,k in enumerate(self.context["headers"])}
        column_types = {i:t for i,t in enumerate(self.context["types"])}
        if success and index in column_names:
            print_text = sm.Print([
                "What type would you like to change {} to?".format(column_names[index]) +
                " It's currently been set to a {} value.".format(column_types[index])
            ])
            select_types = sm.Assign("category_select", t.Select(options={
                "Number (e.g., 2 or 3.4)": "Number",
                "String (e.g., 'a line of text')": "String",
                "Categorical (e.g., 'large' or 'small')": "Categorical"
            }))
            set_index = SetIndex(index)
            return sm.DoAll([print_text, select_types, set_index, sm.Print(["LOL"])]).when_done(self.get_when_done_state())
        return None #True, Done().when_done(self.get_when_done_state())

class ExamineTypes(sm.StateMachine):
    def __init__(self):
        super().__init__()
        self.output = ["Would you like to change anything?"]
    def next_state_base(self, text):
        if util.verify_response(text):
            return ChangeIndex().when_done(self.get_when_done_state())
        return None #True, Done().when_done(self.get_when_done_state())

class CheckTypes(sm.StateMachine):
    def __init__(self, force_check=False):
        super().__init__()
        self.force_check = force_check
        self.output = ["Would you like to examine the automatically inferred types for each column?"]
        if self.force_check:
            self.output = []
            self.accepts_input = False
    def next_state_base(self, text):
        file_str = self.context['data']
        types = rows_and_types(split_line(file_str[0]))
        if not self.force_check:
            self.context["types"] = types
        if self.force_check or util.verify_response(text):
            type_obj = {
                i: {
                    "name": self.context["headers"][i],
                    "type": self.context["types"][i],
                    "example": split_line(self.context["data"][0])[i]
                } for i,_ in enumerate(self.context["headers"])
            }
            print_types = sm.Print([{"type":"data", "value":util.prettify_data(type_obj)}])
            return sm.DoAll([print_types, ChangeIndex()]).when_done(self.get_when_done_state())
        return None #True, Done().when_done(self.get_when_done_state())

class AskForHeaders(sm.StateMachine):
    def __init__(self):
        super().__init__()
    def get_output(self):
        start_from = 1 if self.read_variable("throw_away") else 0
        sample_data = split_line(self.read_variable("loaded_file").content.split("\n")[start_from])
        return [
            "What are the headers? Please enter a list of comma-separated values. I've provided a line of sample data below.",
            {"type":"data", "value":util.prettify_data(sample_data)}
        ]
    def next_state_base(self, text):
        possible_headers = [x.strip() for x in split_line(text)]
        if len(possible_headers) == len(self.context['headers']):
            self.context['headers'] = [x.lower() for x in possible_headers]
            start_from = 1 if self.read_variable("throw_away") else 0
            self.context["data"] = self.read_variable("loaded_file").content.split("\n")[start_from:]
            return True, sm.Print(["Great, thanks."]).when_done(self.get_when_done_state())
        else:
            problem = sm.Print([
                "I ran into a problem. You need to enter {} values.".format(len(self.context["headers"]))
            ]).when_done(self)
        return problem

class GenerateHeaders(sm.StateMachine):
    def __init__(self):
        super().__init__()
        self.output = ["Great, I generated headers:"]
        self.accepts_input = False
    def next_state_base(self, text):
        file_str = self.read_variable("loaded_file").content
        lines = file_str.split("\n")
        num_cols = len(split_line(lines[0]))
        headers = ["column{}".format(i) for i in range(0,num_cols)]
        self.context['headers'] = headers
        start_from = 1 if self.read_variable("throw_away") else 0
        self.context['data'] = file_str.split("\n")[start_from:]
        format_header = util.prettify_data(headers)
        return sm.Print([{"type":"data", "value":format_header}]).when_done(self.get_when_done_state())

class FirstLineHeader(sm.StateMachine):
    def get_output(self):
        file_str = self.read_variable("loaded_file").content
        start_read = 1 if self.read_variable("throw_away") else 0
        headers = [x.lower() for x in split_line(file_str.split("\n")[start_read])]
        format_header = util.prettify_data(headers)
        return [
            "Here are the headers I inferred from the first line. Do these look good?",
            {"type":"data", "value":format_header}
        ]
    def next_state_base(self, text):
        if util.verify_response(text):
            self.write_variable("throw_away", True)
            self.context['data'] = self.read_variable("loaded_file").content.split("\n")[1:]
            return sm.Print(["Great, thanks."]).when_done(self.get_when_done_state())
        return CheckHeader(force_ask=True).when_done(self.get_when_done_state())

class CheckHeader(sm.StateMachine):
    def __init__(self, force_ask=False):
        self.force_ask = force_ask
        super().__init__()
        self.accepts_input = False
    def next_state_base(self, text):
        self.write_variable("throw_away", False)
        file_str = self.read_variable("loaded_file").content
        success, headers = check_file_header(file_str)
        self.context['headers'] = headers
        format_header = util.prettify_data(headers)
        if not success or self.force_ask:
            state_machine = []
            if self.force_ask:
                state_machine.append(
                    sm.Assign("throw_away",
                        t.YesNo("In that case, would you like to throw away the first line of data?",
                            yes=True, no=False)))
                state_machine.append(sm.Print(["Okay, how would you like to generate the header?"]))
            else:
                state_machine.append(sm.Print(["This file does not appear to have a header."]))
            state_machine.append(t.Select(options={
                "Generate the values automatically": GenerateHeaders(),
                "Enter the headers manually": AskForHeaders(),
                "Use first line as header:": FirstLineHeader()
            }))
            return sm.DoAll(state_machine).when_done(self.get_when_done_state())
        return FirstLineHeader().when_done(self.get_when_done_state())

def file_state(file):
    return sm.DoAll([
        sm.Assign("loaded_file", sm.ValueState(file)),
        CheckHeader(),
        CheckTypes(),
        sm.Assign("dataframe", Done()),
        sm.Assign("env_name", t.String("Where would you like to save the dataframe?")),
        sm.AddToIrisEnv("env_name", "dataframe"),
    ])
