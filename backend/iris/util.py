import shlex
import numpy as np
import json
from . import iris_objects
import re
import csv
import inspect
from collections import defaultdict

# dataframe typing detection (TODO: duplicate?)
def detect_type(type_):
    try:
        float(type_)
        return "Number"
    except:
        if len(type_.split()) > 0:
            return "Text"
        else:
            return "String"

# how should we represent row[i][j] type in export to json?
# TODO: should be expanded
def json_encode_df_type(x):
    if isinstance(x, iris_objects.MissingData):
        return "<MissingData>"
    try:
        return float(x)
    except:
        if isinstance(x, str):
            return x
        else:
            return str(type(x))

# helper for getting command source either from special attribute or through inspect
# TODO: this is only used in expression.py right now, helpful elsewhere?
def get_source(cmd, indent="    "):
    if cmd.__source_code__ != None:
        code = indent + cmd.__source_code__
    else:
        code = "".join(inspect.getsourcelines(cmd.command)[0])
    return code

# helpful for iterating when target is usually a list, but sometimes a single value
def single_or_list(x):
    if isinstance(x, list):
        return x
    if isinstance(x, tuple):
        return x
    else:
        return [x]

# return nicer looking numpy and dictionary data representations
def prettify_data(result):
    try:
        np_transform = np.array(result)
        return np.array_str(np_transform)
    except:
        pass
    if isinstance(result, dict) or isinstance(result, list):
        return json.dumps(result, indent=4, default=str)
    return result

# helper for printing a (potentially long) list of values
def print_list(lst, n):
    if len(lst) <= n:
        return "["+ ", ".join(lst) + "]"
    half_n = int(n/2)
    first_p = lst[:half_n]
    second_p = lst[-half_n:]
    return "[" + ", ".join(first_p) + ", ..., " + ", ".join(second_p) + "]"

# is "result" data that we want to format using prettifiers in the frontent output?
def is_data(result):
    if any([isinstance(result, x) for x in [np.ndarray, list, dict, tuple]]):
        return True
    return False

# get latest message from conversation
def get_last_message(messages): return messages[-1]["text"], messages[-1]["class_index"]

# helper for checking for "yes"/"no" in response logic
# TODO: make more sophisticated
def verify_response(text):
    if text.lower() == "yes":
        return True
    else:
        return False

# helper for extracting a number from user input text
def extract_number(text):
    for w in text.split():
        try:
            return True, int(w)
        except:
            pass
    return False, None

def word_overlap(sen1, sents):
    count_hash = defaultdict(int)
    for w1 in sen1.lower().strip().split():
        for s in sents.keys():
            for w2 in s.lower().strip().split():
                if w1 == w2:
                    count_hash[s] += 1
    sort = sorted(sents.items(), key=lambda x: count_hash[x[0]], reverse=True)
    return [x[0] for x in sort], sort[0][1]


# is this word an argument in a template string?
def is_arg(s):
    if len(s)>2 and s[0] == "{" and s[-1] == "}": return True
    return False

# logic to split csv lines (by default on commas)
def split_line(line, delim = ","):
    return [x for x in csv.reader([line], delimiter=delim)][0]

# attempt to match query string to command and return mappings
# Note: a match returned by this function will still be type checked, that code is elsewhere
# this is used by both argmatch.js and commandsearch.js so keeping it here
def arg_match(query_string, command_string):
    maps = {}
    query_words, cmd_words = [split_line(x.lower(), delim=" ") for x in [query_string, command_string]]
    # if there is not alignment between words in query and words in command string, can immediately conclude no match
    if len(query_words) != len(cmd_words): return False, {}
    for qw, cw in zip(query_words, cmd_words):
        if is_arg(cw):
            word_ = cw[1:-1]
            maps[word_] = qw
        else:
            if qw != cw: return False, {}
    return True, maps
