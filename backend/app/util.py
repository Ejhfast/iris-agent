from collections import defaultdict
import numpy as np
from sklearn.linear_model import LogisticRegression
from iris import iris_objects
from iris import state_types as t
import inspect
from iris import util as iris_util

# this determines the type label to give to the variables that appear in the right sidebar
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
    elif isinstance(x, iris_objects.IrisModel):
        return "model"
    elif isinstance(x, iris_objects.IrisDataframe):
        return "dataframe"
    elif isinstance(x, iris_objects.FunctionWrapper):
        return "function"
    elif isinstance(x, iris_objects.CoefficientResults):
        return "coefficients"
    else:
        return str(type(x))

# this returns a dictionary of name and type for variables in the environment
# TODO: what doesn't ASTS have an underscore?
def env_vars(iris):
    out = []
    for k,v in iris.env.items():
        if k in ["__MEMORY__", "__MEMORY_FUNC__", "ASTS"]: continue
        out.append({"name": k, "value": detect_type(v), "order": iris.env_order[k]})
    return out

# command construction utils
# TODO: should this go elsewhere, a separate file, maybe even somewhere in the iris lib itself?

# take a json list of objects fields arg_name, arg_type, and arg_string (question), and return an argument class string
def args_json_to_str(args_json):
    arg_type_hash = {
        "Int": "t.Int",
        "String": "t.String",
        "Array": "t.Array",
        "Float": "t.Float",
        "Dataframe": "t.Dataframe",
        "List": "t.List",
        "DataframeSelector": "t.DataframeSelector",
        "Any": "t.Any"
    }
    key_vals = []
    for arg in args_json:
        key_vals.append("\""+arg["arg_name"]+"\":"+arg_type_hash[arg["arg_type"]]+"(\""+arg["arg_string"]+"\")" )
    return "{"+",".join(key_vals)+"}"

# given a code block, tab it
def tab_block(text, tab_="    "):
    return "\n".join([tab_+x for x in text.split("\n")])

# given a code block, tab it and "return" the last value
def tab_and_return(text, tab_="    "):
    lines = text.split("\n")
    lines[-1] = "return " + lines[-1]
    tab_indent = [tab_+x for x in lines]
    formatted_lines = "\n".join(tab_indent)
    return formatted_lines

# get a comma-separated list of arguments for the command definition
def make_args_string(args_obj):
    return ", ".join([x["arg_name"] for x in args_obj])

# make the source code of a command given a text block and args
def make_command_text(text, args_obj):
    args_str = make_args_string(args_obj)
    start = "def command(self, " + args_str + "):\n"
    formatted_lines = tab_and_return(text)
    return start+formatted_lines

# make the sourcew code of an explanation given a text block
def make_explanation_text(text):
    start = "def explanation(self, result):\n"
    formatted_lines = tab_and_return(text)
    return start+formatted_lines

# finally, put everything together to construct the full text source
def make_class_text(class_name, title, command_text, explanation_text, args_obj, examples, tab_="    "):
    args_obj_str = args_json_to_str(args_obj)
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
    # metadata with command source (can't retrieve with inspect)
    extra = "{}.__source_code__ = \"\"\"".format("_"+class_name)
    extra += command_text+"\n"
    extra += "\"\"\""
    # same for the explanation
    extra_explain = "{}.__explain_code__ = \"\"\"".format("_"+class_name)
    extra_explain += explanation_text+"\n"
    extra_explain += "\"\"\""
    return start, extra, extra_explain


# helpers for breaking apart a class instance into a json object
# TODO: should this go elsewhere?

import re

# function to detect what type and how many tabs there are
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

# generate json arguments from the command argument annotation
def args2json(argument_types):
    out_args = []
    for k,v in argument_types.items():
        out_args.append({
            "arg_name":k,
            "arg_type":v.__class__.__name__,
            "arg_string":v.question # does this method exist?
        })
    return out_args

# transform command body to source that will appear in the command editor UI
def code2ui(code_lines):
    remove_def = code_lines[1:]
    remove_def[-1] = remove_def[-1].replace("return ", "").rstrip()
    # still need to remove tabs/spaces
    print(code_lines)
    print("".join(untab(remove_def)))
    return "".join(untab(remove_def))

# put all of these methods together
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
