import numpy as np
import io
import base64
from . import util
import copy
from collections import defaultdict
import json
import pandas as pd

# this file contains classes that define wrapper APIs for common data in the iris environment
# for example, Models (predictive model) or Dataframes

# all of this is old and should be upgraded...

class IrisValue:
    def __init__(self, value, name=None):
        self.value = value
        self.name = name

class IrisId(IrisValue):
    def __init__(self, value, id, name=None):
        self.value = value
        self.id = id
        if not name:
            self.name = value
        else:
            self.name = name

class IrisImage(IrisId):
    type="Image"
    def __init__(self, plt, name):
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        self.value = base64.b64encode(buf.read()).decode('utf-8')
        self.name = name

# end old...

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
    def __init__(self, name, data_x, data_y, colors=None, color_name=None, x_label="x value", y_label="y value"):
        self.name = name
        self.x_label = x_label
        self.y_label = y_label
        self.spec = {
          "mark": "point",
          "encoding": {
            "x": {"field": self.x_label, "type": "quantitative", "scale": {"domain": [float(min(data_x)), float(max(data_x))]}},
            "y": {"field": self.y_label, "type": "quantitative", "scale": {"domain": [float(min(data_y)), float(max(data_y))]}},
          }
        }
        if color_name != None:
            self.spec["encoding"]["color"] = {"field": color_name, "type": "nominal"}
        data_vals = []
        for i in range(0,len(data_x)):
            obj = {}
            obj[self.x_label] = float(data_x[i])
            obj[self.y_label] = float(data_y[i])
            if color_name != None:
                obj[color_name] = colors[i]
            data_vals.append(obj)
        self.data = { "values": data_vals }


def is_numeric(obj):
    attrs = ['__add__', '__sub__', '__mul__', '__truediv__', '__pow__']
    return all(hasattr(obj, attr) for attr in attrs)

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
        self.path = name
        self.name = name.split("/")[-1]
        self.content = content

# defines API for dataframes in Iris
# TODO: this API is very important, so needs a lot of work
# http://pbpython.com/pandas-list-dict.html
class IrisDataframe:
    type="DataFrame"

    @staticmethod
    def from_csv(file):
        iris_df = IrisDataframe(empty=True)
        iris_df.df = pd.read_csv(file)
        return iris_df

    # "column_names" is ordered list of names associated with each column
    # "column_types" is ordered list of types associated with each column
    # "data" is a list of lists or ndarray (matrix) that holds the data
    # "type_convert_data" indicates whether the Dataframe should attempt automatic type inference
    def __init__(self, data, column_names=None, column_types=None, empty=False):
        if not empty:
            if column_names:
                self.df = pd.DataFrame(data, columns=column_names)
            else:
                self.df = pd.DataFrame(data)

    def columns(self):
        return self.df.columns.tolist()

    def dtype_name(self, t):
        if is_numeric(t):
            return "Number"
        elif isinstance(t, str) and len(t) > 50:
            return "Text"
        else:
            return "String"

    # produce a data representation that the frontend can understand and display
    def generate_spreadsheet_data(self):
        print(self.df)
        print(self.df.columns)
        for c in self.df.columns:
            print(self.df[c])
        # column data listing columns and types # TODO: key, name currently redundant #self.df[obj][0]
        column_data = [{"key":obj, "name":obj, "type":self.dtype_name(self.df[obj].tolist()[0])} for obj in self.df.columns]
        # column_data = [{"key":name, "name":name, "type":self.column_types[i]} for i,name in enumerate(self.column_names)]
        row_data = self.df.to_dict('records')[:50]
        for row in row_data:
            for k,v in row.items():
                row[k] = util.json_encode_df_type(v)
        return pd.io.json.dumps({"column_data":column_data, "row_data":row_data})

    # get a single column from the dataframe
    # TODO: likely unnecessary give dataframe-centric functions
    def get_column(self, name):
        return self.df[name].tolist()

    # get a single column from the dataframe
    # TODO: likely unnecessary give dataframe-centric functions
    def get_columns(self, names = None):
        if names == None:
            names = self.columns()
        out = []
        for name in names:
            out.append(self.get_column(name))
        return out

    # add a new column to the dataframe
    def add_columns(self, names, columns):
        new_columns = self.copy_frame(self.columns())
        for column, name in zip(columns, names):
            new_columns = new_columns.add_column(name, column)
        return new_columns

    def concat(self, dataframe, axis = 0):
        return IrisDataframe(pd.concat([self.df, dataframe.df], axis))

    # add a new column to the dataframe
    def add_column(self, name, column):
        new_column = self.copy_frame(self.columns())
        new_column.df[name] = pd.Series(column, index=self.df.index)
        return new_column

    # concatenate rows to dataframe
    def add_rows(self, rows):
        new_data = pd.DataFrame(rows, columns=self.df.columns)
        self.df = self.df.append(new_data)
        return self

    # copy a dataframe (only the provided columns)
    # "conditions" is an optional list of functions that can filter rows from the copied frame
    # to be included in the copy, a row must pass all condition functions
    # condition function: row => Bool
    def copy_frame(self, columns, conditions=[]):
        return IrisDataframe(self.df[columns].to_dict('records'), columns)

    # map a function over the list of columns
    # function takes row[i][j] and can return anything
    # this function happens in place! so usually make a copy of the frame first
    def map_columns(self, columns, func):
        new_dataframe = self.copy_frame(self.columns())
        for c in columns:
            new_dataframe.df[c] = new_dataframe.df[c].map(func)
        return new_dataframe

    # create a copy of a dataframe with the columns in question removed
    def remove_column(self, names):
        for name in names:
            self.df = self.df.drop(name, 1)
        return self

    def to_matrix(self):
        return self.df.as_matrix()

    # select rows across the dataframe where corresponding values in a column match an operation
    # e.g., "filter dataframe to all rows with petal-length less than 2"
    # creates a new copy of the dataframe
    def select_data(self, column, operation):
        def new_operation(x):
            print(x, operation(x))
            return operation(x)
        return IrisDataframe(self.df[self.df.apply(lambda x: new_operation(x[column]), axis=1)])

    # export a dataframe to a string representation
    # TODO: this is really brittle, need to escape commas in quoted strings etc.
    def to_csv(self, file_path):
        with open(file_path, "w") as f:
            f.write(self.df.to_csv())

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
