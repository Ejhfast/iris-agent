import numpy as np
import io
import base64
from . import util
import copy
from collections import defaultdict
import json

# this file contains classes that define wrapper APIs for common data in the iris environment
# for example, Models (predictive model) or Dataframes

# wrapper for vega types (nothing special here, just an indicator to let frontent know this is vega data)
class IrisVega:
    type="Vega"

# define a vega schema for a bar chart
class IrisBar(IrisVega):
    def __init__(self, name, keys, data, bar_label="label", value_label="value"):
        self.name = name
        self.bar_label = bar_label
        self.value_label = value_label
        self.spec = {
          "mark": "bar",
          "encoding": {
            "x": {"field": self.bar_label, "type": "nominal"},
            "y": {"field": self.value_label, "type": "quantitative"}
          }
        }
        data_vals = []
        for i,k in enumerate(keys):
            obj = {}
            obj[self.bar_label] = k
            obj[self.value_label] = data[i]
            data_vals.append(obj)
        self.data = { "values": data_vals }


#vega class for scatter plot (Binbin Chen 7/18/2017)
class IrisScatter(IrisVega):
    def __init__(self, name, data_x, data_y, x_label="x value", y_label="y value"):
        self.name = name
        self.x_label = x_label
        self.y_label = y_label
        self.spec = {
          "mark": "point",
          "encoding": {
            "x": {"field": self.x_label, "type": "quantitative"},
            "y": {"field": self.y_label, "type": "quantitative"}
          }
        }
        data_vals = []
        for x0,y0 in zip(data_x,data_y):
            obj = {}
            obj[self.x_label] = x0
            obj[self.y_label] = y0
            data_vals.append(obj)
        self.data = { "values": data_vals }


# a wrapper for sklearn models
# unlike sklean model classes, iris models keep track of the data over which they are defined
# TODO: model.model is a bit weird
class IrisModel:
    type="Model"
    # "model" is a sklearn model class
    def __init__(self, model, X, y, name=None):
        self.dataframe_X = X
        self.dataframe_y = y
        self.X = X.to_matrix()
        self.y = y.to_matrix()
        self.y = self.y.reshape(self.y.shape[0])
        self.model = model
        self.name = name
    def fit(self):
        self.model.fit(self.X, self.y)

# This will fill in missing data in a dataframe
class MissingData:
    def __init__(self, expected_type=None):
        self.expected_type = expected_type

# simple wrapper for files in the iris environment
# TODO: not good to read in all file content by default
# TODO: should store full path
class IrisFile:
    type="File"
    def __init__(self, name, content):
        self.name = name.split("/")[-1]
        self.content = content

# defines API for dataframes in Iris
# TODO: this API is very important, so needs a lot of work
# http://pbpython.com/pandas-list-dict.html
class IrisDataframe:
    type="DataFrame"
    # "column_names" is ordered list of names associated with each column
    # "column_types" is ordered list of types associated with each column
    # "data" is a list of lists or ndarray (matrix) that holds the data
    # "type_convert_data" indicates whether the Dataframe should attempt automatic type inference
    def __init__(self, column_names=[], column_types=[], data=[], type_convert_data=False):
        self.column_names = column_names
        self.column_types = column_types
        self.missing_data = False
        if type_convert_data:
            self.data = self.convert_data(data)
        else:
            self.data = data
            self.cat2index = defaultdict(dict)

    # produce a data representation that the frontend can understand and display
    def generate_spreadsheet_data(self):
        # column data listing columns and types # TODO: key, name currently redundant
        column_data = [{"key":name, "name":name, "type":self.column_types[i]} for i,name in enumerate(self.column_names)]
        row_data = []
        # each row will be a dictionary mapping column name to value
        for i,row in enumerate(self.data):
            if i < 50:
                row_data.append({self.column_names[j]:util.json_encode_df_type(d) for j,d in enumerate(row) if j < 50 })
        return json.dumps({"column_data":column_data, "row_data":row_data})

    # get a single column from the dataframe
    # TODO: likely unnecessary give dataframe-centric functions
    def get_column(self, name):
        indexes = {name:i for i, name in enumerate(self.column_names)}
        return np.array([row[indexes[name]] for row in self.data])

    # add a new column to the dataframe
    def add_column(self, name, column, type_):
        new_df = self.copy_frame(self.column_names)
        new_df.data = np.concatenate((new_df.data, column.reshape(len(column), 1)), axis=1)
        print(new_df)
        new_df.column_names = new_df.column_names + [name]
        new_df.column_types = new_df.column_names + [type_]
        print(new_df.data)
        new_df.cat2index = defaultdict(dict)
        return new_df

    # concatenate rows to dataframe
    def add_rows(self, rows):
        new_df = self.copy_frame(self.column_names)
        new_df.data = np.concatenate((new_df.data, rows), axis=0)
        return new_df

    # return matrix representation of underlying data
    def to_matrix(self):
        return np.array(self.data)#.T

    # copy a dataframe (only the provided columns)
    # "conditions" is an optional list of functions that can filter rows from the copied frame
    # to be included in the copy, a row must pass all condition functions
    # condition function: row => Bool
    def copy_frame(self, columns, conditions=[]):
        new_frame = copy.copy(self)
        new_frame.column_names = list(columns)
        new_frame.data = []
        new_frame.cat2index = {}
        indexes = {name:i for i, name in enumerate(self.column_names)}
        for i in range(0, len(self.data)):
            if all([f(self.data[i]) for f in conditions]):
                new_frame.data.append(list([self.data[i][indexes[c]] for c in new_frame.column_names]))
        for i,name in enumerate(new_frame.column_names):
            new_frame.cat2index[i] = dict(self.cat2index[indexes[name]])
            new_frame.column_types[i] = str(self.column_types[indexes[name]])
        return new_frame

    # map a function over the list of columns
    # function takes row[i][j] and can return anything
    # this function happens in place! so usually make a copy of the frame first
    def map_columns(self, columns, func):
        indexes = {name:i for i, name in enumerate(self.column_names)}
        columns_to_map = [indexes[column] for column in columns]
        types = defaultdict(set)
        for i in range(0, len(self.data)):
            for j in range(0, len(self.data[i])):
                if j in columns_to_map:
                    new_v = func(self.data[i][j])
                    types[j].add(util.detect_type(new_v))
                    self.data[i][j] = new_v
        current_types = [x for x in self.column_types]
        # if the function produces a consistent type across the data in each column, then adjust the type label
        for i,col_typ in enumerate(current_types):
            if len(types[i]) == 1:
                current_types[i] = list(types[i])[0]
        self.column_types = current_types
        return self

    # convert a column to a new type
    # "name" is the name of the column
    # "type_" is the new type, for now either "String", "Number", or "Categorical"
    # this changes a dataframe in place!
    def change_type(self, name, type_):
        cat2index = {}
        def convert_type(value, type_):
            if type_ == "String":
                return str(value)
            elif type_ == "Number":
                return float(value)
            elif type_ == "Categorical":
                if not value in cat2index:
                    cat2index[value] = len(cat2index)
                return cat2index[value]
        indexes = {name:i for i, name in enumerate(self.column_names)}
        for row in self.data:
            row[indexes[name]] = convert_type(row[indexes[name]], type_)
        self.column_types[indexes[name]] = type_
        self.cat2index[indexes[name]] = cat2index
        return self

    # create a copy of a dataframe with the columns in question removed
    def remove_column(self, names):
        return self.copy_frame([x for x in self.column_names if not x in names])

    # select rows across the dataframe where corresponding values in a column match an operation
    # e.g., "filter dataframe to all rows with petal-length less than 2"
    # creates a new copy of the dataframe
    def select_data(self, column, operation):
        indexes = {name:i for i, name in enumerate(self.column_names)}
        col_i = indexes[column]
        # capture the column index in a closure
        def selector(row):
            if(operation(row[col_i])):
                return True
            return False
        return self.copy_frame(self.column_names, conditions=[selector])

    # process an initial csv file and transform types
    # TODO: add error handling
    # TODO: probably let models handle categorical logic? think about this?
    def convert_data(self, data):
        new_data = []
        cat2index = defaultdict(dict)
        for j,line in enumerate(data):
            if line == '': continue # empty last line after new line
            old_row = util.split_line(line)
            new_row = []
            for i,value in enumerate(old_row):
                # check for missing data
                if value == "":
                    self.missing_data = True
                    new_row.append(MissingData(self.column_types[i]))
                elif self.column_types[i] == "Number":
                    new_row.append(float(value))
                elif self.column_types[i] == "Categorical":
                    if not value in cat2index[i]:
                        cat2index[i][value] = len(cat2index[i])
                    new_row.append(cat2index[i][value])
                else:
                    new_row.append(value)
            new_data.append(new_row)
        self.cat2index = cat2index
        return new_data

    # export a dataframe to a string representation
    # TODO: this is really brittle, need to escape commas in quoted strings etc.
    def to_csv(self, file_path):
        header = ",".join(self.column_names)
        data = "\n".join([",".join([str(x) for x in row]) for row in self.data])
        with open(file_path, "w") as f:
            f.write(header+"\n"+data)

# a wrapper ior Iris functions
# the reason we need this is that, by defauly, if an iris command returns another iris command
# this will be interpreted as passing control to that function, e.g., calling it
class FunctionWrapper:
    def __init__(self, function, name="anonymous func"):
        self.function = function
        self.name = name

class PartialWrapper(FunctionWrapper):
    def __init__(self, function, name="anonymous partial"):
        self.function = function
        self.name = name
    def partial_wrap(*args):
        return self.function.partial_wrap(*(args[1:]))
    def partial(*args):
        return self.function.partial(*(args[1:]))

# references point to data in the iris environment
class EnvReference:
    def __init__(self, name):
        self.name = name
    def get_value(self, iris):
        return iris.env[self.name]

class FreeVariable:
    def __init__(self):
        return None
