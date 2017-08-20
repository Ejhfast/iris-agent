from .. import IrisCommand
from .. import state_types as t
from .. import state_machine as sm
from .. import util as util
from .. import iris_objects


class LoadCSV(IrisCommand):
    title = "load csv from {filename}"
    examples = [ "load csv {filename} into {name}",
                 "csv data from {filename}" ]
    help_text = [
        "This command loads an csv file into a dataframe."
    ]
    argument_types = {
        "filename" : t.File(question="What csv to load?"),
        "name": t.String("Where would you like to save the data?")
    }
    def command(self, filename, name):
        import pandas as pd
        new_df = iris_objects.IrisDataframe(None, empty=True)
        new_df.df = pd.read_csv(filename.path, sep=None)
        self.iris.add_to_env(name, new_df)
        return new_df

loadCSV = LoadCSV()

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

class CombineDataframesColumnwise(IrisCommand):
    title = "combine columns for {dataframe1} and {dataframe2}"
    examples = [
        "combine dataframe columns {dataframe1} {dataframe2}"
    ]
    argument_types = {
        "dataframe1": t.Dataframe("What is the first dataframe to combine?"),
        "dataframe2": t.Dataframe("The second dataframe?")
    }
    def command(self, dataframe1, dataframe2):
        return dataframe1.concat(dataframe2, axis=1)

combineDataframesColumnwise = CombineDataframesColumnwise()

class CombineDataframesRowwise(IrisCommand):
    title = "combine rows {dataframe1} and {dataframe2}"
    examples = [
        "combine dataframe rows {dataframe1} {dataframe2}"
    ]
    argument_types = {
        "dataframe1": t.Dataframe("What is the first dataframe to combine?"),
        "dataframe2": t.Dataframe("The second dataframe?")
    }
    def command(self, dataframe1, dataframe2):
        return dataframe1.concat(dataframe2, axis=0)

combineDataframesRowwise = CombineDataframesRowwise()

class ApplyFunctionDataframe(IrisCommand):
    title = "apply function to {dataframe}"
    argument_types = {
        "dataframe": t.Dataframe("What dataframe?"),
        "selector_names": t.DataframeSelector("Please choose the columns to transform.", dataframe="dataframe"),
        "command": sm.ApplySearch(question=["What function do you want to apply to the columns?"])
    }
    ignore_free = True
    def command(self, dataframe, selector_names, command):
        function_to_apply = command.function.partial # wrapper... # wrapper + argmatch object...
        # somehow check whether the function only takes one argument?
        # also, whether the function takes the right type? and what type it returns?
        return dataframe.map_columns(selector_names.columns(), function_to_apply)

applyFunctionDataframe = ApplyFunctionDataframe()

class FilterFunctionDataframe(IrisCommand):
    title = "filter {dataframe}"
    argument_types = {
        "dataframe": t.Dataframe("What dataframe?"),
        "selector_names": t.DataframeSelector("Please choose a column to filter by.", dataframe="dataframe"),
        "command": sm.ApplySearch(question=["What filter do you want to apply to the column?"])
    }
    ignore_free = True
    def command(self, dataframe, selector_names, command):
        function_to_apply = command.function.partial # wrapper + argmatch object...
        # somehow check whether the function only takes one argument?
        # also, whether the function takes the right type? and what type it returns?
        print(dataframe)
        return dataframe.select_data(selector_names.columns()[0], function_to_apply)
        #return new_df.map_columns(selector_names.column_names, function_to_apply)

filterFunctionDataframe = FilterFunctionDataframe()

class SelectAllColumnsExcept(IrisCommand):
    title = "select all columns except for {column}"
    examples = ["all columns except {column}", "all but {column}"]
    can_call = [t.DataframeSelector]
    argument_types = {"column": t.String("What column do you want to exclude?")}
    def command(self, column):
        dataframe = self.caller.expose_state()["dataframe"]
        return ", ".join([x for x in dataframe.columns() if x != column])

selectAllColumnsExcept = SelectAllColumnsExcept()

class SelectAllColumns(IrisCommand):
    title = "select all columns"
    examples = ["all columns except"]
    can_call = [t.DataframeSelector]
    argument_types = { }
    def command(self):
        dataframe = self.caller.expose_state()["dataframe"]
        return ", ".join([x for x in dataframe.columns()])

selectAllColumns = SelectAllColumns()

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
        return dataframe.get_column(column)

getDFColumn = GetDFColumn()

# class FilterDataLessThan(IrisCommand):
#     title = "filter {data} with {column} less than {number}"
#     examples = [ "filter {data} {column} < {number}" ]
#     argument_types = {
#         "data": t.Dataframe("What dataframe to extract the column from?"),
#         "column": t.String("What is the name of the column?"),
#         "number": t.Float("What number must the column be less than?")
#     }
#     help_text = [
#         "This command selects all data where a column is less than a number."
#     ]
#     def command(self, data, column, number):
#         return data.select_data(column, lambda x: x < number)
#
# filterDataLessThan = FilterDataLessThan()
#
# class FilterDataGreaterThan(IrisCommand):
#     title = "filter {data} with {column} greater than {number}"
#     examples = [ "filter {data} {column} > {number}" ]
#     argument_types = {
#         "data": t.Dataframe("What dataframe to extract the column from?"),
#         "column": t.String("What is the name of the column?"),
#         "number": t.Float("What number must the column be greater than?")
#     }
#     help_text = [
#         "This command selects all data where a column is greater than a number."
#     ]
#     def command(self, data, column, number):
#         return data.select_data(column, lambda x: x > number)
#
# filterDataGreaterThan = FilterDataGreaterThan()
