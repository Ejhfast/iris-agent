from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util

class SaveDf(IrisCommand):
    title = "save {dataframe} to csv"
    argument_types = {
        "dataframe": t.Dataframe("What dataframe?"),
        "selector_names": t.DataframeSelector("Please choose a the columns to transform.", dataframe="dataframe"),
        "file_name": t.String("Where do you want to save the csv?")
    }
    def command(self, dataframe, selector_names, file_name):
        selector_names.to_csv("user_data/"+file_name) # probably not?
        return "Saved."

saveDf = SaveDf()

class ApplyFunctionDataframe(IrisCommand):
    title = "apply function to {dataframe}"
    argument_types = {
        "dataframe": t.Dataframe("What dataframe?"),
        "selector_names": t.DataframeSelector("Please choose a the columns to transform.", dataframe="dataframe"),
        "command": sm.FunctionSearch(question=["What function do you want to apply to the columns?"])
    }
    def command(self, dataframe, selector_names, command):
        function_to_apply = command.function.function.partial # wrapper + argmatch object...
        new_df = dataframe.copy_frame(dataframe.column_names)
        # somehow check whether the function only takes one argument?
        # also, whether the function takes the right type? and what type it returns?
        return new_df.map_columns(selector_names.column_names, function_to_apply)

applyFunctionDataframe = ApplyFunctionDataframe()

class FilterFunctionDataframe(IrisCommand):
    title = "filter {dataframe}"
    argument_types = {
        "dataframe": t.Dataframe("What dataframe?"),
        "selector_names": t.DataframeSelector("Please choose a the columns to filter by.", dataframe="dataframe"),
        "command": sm.FunctionSearch(question=["What filter do you want to apply to the columns?"])
    }
    def command(self, dataframe, selector_names, command):
        function_to_apply = command.function.function.command # wrapper + argmatch object...
        new_df = dataframe.copy_frame(dataframe.column_names)
        # somehow check whether the function only takes one argument?
        # also, whether the function takes the right type? and what type it returns?
        return new_df.map_columns(selector_names.column_names, function_to_apply)

applyFunctionDataframe = ApplyFunctionDataframe()

class SelectAllColumnsExcept(IrisCommand):
    title = "select all columns except for {column}"
    examples = ["all columns except {column}", "all but {column}"]
    can_call = [t.DataframeSelector]
    argument_types = {"column": t.String("What column do you want to exclude?")}
    def command(self, column):
        dataframe = self.caller.expose_state()["dataframe"]
        return ", ".join([x for x in dataframe.column_names if x != column])

selectAllColumnsExcept = SelectAllColumnsExcept()

class SwitchDataframe(IrisCommand):
    title = "choose from {dataframe} instead"
    examples = ["from {dataframe}", "select from {dataframe}"]
    can_call = [t.DataframeSelector]
    argument_types = {
        "dataframe": t.Dataframe("What other dataframe would you like?"),
        "new_selector": t.DataframeSelector("What columns would you like?", dataframe="dataframe")
    }
    def command(self, dataframe, new_selector):
        return new_selector

switchDataframe = SwitchDataframe()

class LoadCSVData(IrisCommand):
    title = "load csv data from {file}"
    examples = ["load csv {file}"]
    argument_types = {
        "file": t.File("What file would you like to load?"),
    }
    def command(self, file):
        from .fileupload import file_state
        # file_state is a custom state machine, built using Iris low-level library
        # allows for injection of user input into code logic
        return file_state(file)
    def explanation(self, result):
        return []

loadCSVData = LoadCSVData()

class ListDataframeNames(IrisCommand):
    title = "list columns from {dataframe}"
    examples = [ "list columns {dataframe}" ]
    help_text = [
        "This command lists the column names for a Dataframe object."
    ]
    def command(self, dataframe : t.EnvVar("What dataframe?")):
        return dataframe.column_names
    def explanation(self, results):
        return [
            "The column names are:",
            results
        ]

listDataframeNames = ListDataframeNames()

class GetDFColumn(IrisCommand):
    title = "get {column} from {dataframe}"
    examples = [ "get {column} {dataframe}" ]
    argument_types = {
        "dataframe": t.Dataframe("What dataframe to extract the column from?"),
        "column": t.String("What is the name of the column?")
    }
    help_text = [
        "This command pull a column from a dataframe into the main environment."
    ]
    def command(self, dataframe, column):
        print("LIWC")
        print(dataframe.to_matrix().shape)
        print(len(dataframe.column_names))
        print(dataframe.column_names)
        return dataframe.get_column(column)

getDFColumn = GetDFColumn()

class FilterDataLessThan(IrisCommand):
    title = "filter {data} with {column} less than {number}"
    examples = [ "filter {data} {column} < {number}" ]
    argument_types = {
        "data": t.Dataframe("What dataframe to extract the column from?"),
        "column": t.String("What is the name of the column?"),
        "number": t.Float("What number must the column be less than?")
    }
    help_text = [
        "This command selects all data where a column is less than a number."
    ]
    def command(self, data, column, number):
        return data.select_data(column, lambda x: x < number)

filterDataLessThan = FilterDataLessThan()

class FilterDataGreaterThan(IrisCommand):
    title = "filter {data} with {column} greater than {number}"
    examples = [ "filter {data} {column} > {number}" ]
    argument_types = {
        "data": t.Dataframe("What dataframe to extract the column from?"),
        "column": t.String("What is the name of the column?"),
        "number": t.Float("What number must the column be greater than?")
    }
    help_text = [
        "This command selects all data where a column is greater than a number."
    ]
    def command(self, data, column, number):
        return data.select_data(column, lambda x: x > number)

filterDataGreaterThan = FilterDataGreaterThan()

class SelectorTest(IrisCommand):
    title = "selector test"
    examples = []
    def command(self, selector : t.DataframeSelector("Give me dataframe")):
        return selector

selectorTest = SelectorTest()
