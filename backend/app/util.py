from collections import defaultdict
import numpy as np
from sklearn.linear_model import LogisticRegression
from iris import iris_objects
from iris import state_types as t
import inspect
from iris import util as iris_util


# crappy data type inference function
def detect_data_type(data):
    try:
        return "Number", float(data)
    except:
        if len(data.split()) > 1:
            return "Text", data
        else:
            return "Categorical", data

# crappy function to figure out csv type and header
# TODO: deal with no header
# TODO: deal with quoted strings
def rows_and_types(data):
    title = data[0]
    cols = title.replace("\"","").split(",")
    sample_line = data[1].split(",")
    return list(zip(cols,[detect_data_type(x) for x in sample_line]))

def process_data(meta, content):
    env = defaultdict(list)
    cat2index = {}
    for j,line in enumerate(content):
        if j == 0: continue
        cols = line.replace("\"","").split(",")
        for i,col in enumerate(cols):
            val = None
            if meta[i]["type"] == "number":
                val = float(col)
            elif meta[i]["type"] == "categorical":
                if col in cat2index:
                    val = cat2index[col]
                else:
                    val = len(cat2index)
                    cat2index[col] = val
            else:
                val = col
            env[meta[i]["name"]].append(val)
    for k,vs in meta.items():
        tp = meta[k]["type"]
        if tp in ["number", "categorical"]:
            env[meta[k]["name"]] = np.array(env[meta[k]["name"]])
    return env

def detect_type(x):
    if isinstance(x, str):
        return "string"
    elif isinstance(x, int):
        return "int"
    elif isinstance(x, dict):
        return "dict"
    elif isinstance(x, float):
        return "float"
    elif isinstance(x, np.ndarray):
        return "array"
    elif isinstance(x, list):
        return "list"
    elif isinstance(x, iris_objects.IrisImage):
        return "image"
    elif isinstance(x, iris_objects.IrisModel):
        return "model"
    elif isinstance(x, iris_objects.IrisData):
        return "dataset"
    elif isinstance(x, iris_objects.IrisDataframe):
        return "dataframe"
    elif isinstance(x, iris_objects.FunctionWrapper):
        return "function"
    elif isinstance(x, iris_objects.CoefficientResults):
        return "coefficients"
    else:
        return str(type(x))

def env_vars(iris):
    out = []
    for k,v in iris.env.items():
        if k in ["__MEMORY__", "__MEMORY_FUNC__", "ASTS"]: continue
        key = k.name if isinstance(k, iris_objects.IrisValue) else k
        out.append({"name": key, "value": detect_type(v), "order": iris.env_order[k]})
    return out

def make_xy(meta, env):
    X, y = None, None
    feature_index = {"X":{}, "y":{}}
    def init_or_append(X,data):
        npx = np.array(data)
        npx = npx.reshape(npx.shape[0],1)
        if X != None: return np.concatenate((X,npx),axis=1)
        return npx
    for k,vs in meta.items():
        if "x_value" in vs:
            X = init_or_append(X, env[vs["name"]])
            feature_index["X"][X.shape[1]-1] = vs["name"]
        if "y_value" in vs:
            y = init_or_append(y, env[vs["name"]])
            feature_index["y"][y.shape[1]-1] = vs["name"]
    if y.shape[1] == 1:
        y = y.reshape(y.shape[0])
    return X,y,feature_index

# command construction utils

def args_json_to_str(args_json):
    arg_type_hash = {
        "Int": "t.Int",
        "String": "t.String",
        "Array": "t.Array",
        "Float": "t.Float",
        "Dataframe": "t.Dataframe",
        "List": "t.List",
        "Any": "t.Any"
    }
    key_vals = []
    for arg in args_json:
        key_vals.append("\""+arg["arg_name"]+"\":"+arg_type_hash[arg["arg_type"]]+"(\""+arg["arg_string"]+"\")" )
    return "{"+",".join(key_vals)+"}"

def tab_block(text, tab_="    "):
    return "\n".join([tab_+x for x in text.split("\n")])

def tab_and_return(text, tab_="    "):
    lines = text.split("\n")
    lines[-1] = "return " + lines[-1]
    tab_indent = [tab_+x for x in lines]
    formatted_lines = "\n".join(tab_indent)
    return formatted_lines

def make_args_string(args_obj):
    # try:
    #     args_obj_rep = eval(args_obj)
    # except:
    #     return "ARGS..."
    return ", ".join([x["arg_name"] for x in args_obj])

def make_command_text(text, args_obj):
    args_str = make_args_string(args_obj)
    start = "def command(self, " + args_str + "):\n"
    formatted_lines = tab_and_return(text)
    return start+formatted_lines

def make_explanation_text(text):
    start = "def explanation(self, result):\n"
    formatted_lines = tab_and_return(text)
    return start+formatted_lines

def make_class_text(class_name, title, command_text, explanation_text, args_obj, examples, tab_="    "):
    args_obj_str = args_json_to_str(args_obj)
    #class_name = "".join([x.capitalize() for x in name.split("_")])
    start = "class {}(IrisCommand):\n".format(class_name)
    start += "{}title = \"{}\"\n".format(tab_,title)
    start += "{}examples = [".format(tab_) + ", ".join(["\""+x+"\"" for x in examples]) + "]\n"
    try:
        start += "{}argument_types = {}\n".format(tab_,args_obj_str)
    except:
        start += "argument_types = # COULD NOT PARSE ARGS\n".format(tab_)
    command_text = make_command_text(command_text, args_obj)
    explanation_text = make_explanation_text(explanation_text)
    start += tab_block(command_text)+"\n"
    start += tab_block(explanation_text)+"\n"
    start += "{} = {}()\n".format("_"+class_name, class_name)
    extra = "{}.__source_code__ = \"\"\"".format("_"+class_name)
    extra += command_text+"\n"
    extra += "\"\"\""
    extra_explain = "{}.__explain_code__ = \"\"\"".format("_"+class_name)
    extra_explain += explanation_text+"\n"
    extra_explain += "\"\"\""
    return start, extra, extra_explain

def evalTest(name, title, command_text, explanation_text, args_obj):
    env = {}
    class_str = make_class_text(name, title, command_text, explanation_text, args_obj)
    exec(class_str, env)

# command 2 json

import re

def untab(lines):
    succ = False
    for i in range(2,9)[::-1]:
        if lines[0][0:i] == "\t"*i:
            tab = "\t"*i
            succ = True
            break
    if not succ and lines[0][0] == "\t":
        tab = "\t"
        succ = True
    for i in range(2,9)[::-1]:
        if lines[0][0:i] == " "*i:
            tab = " "*i
            succ = True
            break
    if not succ and lines[0][0] == " ":
        tab = " "
    elif not succ:
        tab = ""
    print("using tab", (tab,))
    return [re.sub(tab, "", line, 1) for line in lines]

def args2json(argument_types):
    out_args = []
    for k,v in argument_types.items():
        out_args.append({
            "arg_name":k,
            "arg_type":v.__class__.__name__,
            "arg_string":v.question # does this method exist?
        })
    return out_args

def code2ui(code_lines):
    remove_def = code_lines[1:]
    remove_def[-1] = remove_def[-1].replace("return ", "").rstrip()
    # still need to remove tabs/spaces
    print(code_lines)
    print("".join(untab(remove_def)))
    return "".join(untab(remove_def))

#bin dune earth water space walk despair
def command2obj(command):
    obj = {}
    if command.__explain_code__:
        explain_code = [x+"\n" for x in command.__explain_code__.rstrip().split("\n")]
        print(explain_code)
    else:
        explain_code = inspect.getsourcelines(command.explanation)[0]
    if command.__source_code__:
        source_code = [x+"\n" for x in command.__source_code__.rstrip().split("\n")]
    else:
        source_code = inspect.getsourcelines(command.command)[0]
    obj["name"] = command.__class__.__name__
    obj["examples"] = command.examples
    obj["title"] = command.title
    obj["args"] = args2json(command.argument_types)
    obj["explanation"] = code2ui(explain_code)
    obj["command"] = code2ui(source_code)
    return obj

# IVFPT7RKGRZLAOCO
