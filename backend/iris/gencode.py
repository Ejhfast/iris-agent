from . import state_machine as sm
import inspect
import re
from . import iris_objects

# return a list of all composed iris commands/functions in an AST
def extract_functions(ast):
    new_functions = [ast]
    # iterate over args bindings, if they are functions then append and recurse
    for arg in ast.command_args:
        if arg in ast.binding_machine:
            if isinstance(ast.binding_machine[arg], sm.Function):
                new_functions = new_functions + extract_functions(ast.binding_machine[arg])
    return new_functions

# create a single-function def of a command given a iris command class
# "class_name" is literal class name of iris command
# "code" is underlying source of command
def rename_code(class_name, code):
    # function name comes from capital letters in class name
    name_words = [x.lower() for x in re.findall('[A-Z][^A-Z]*', class_name)]
    # join on snakecase
    new_name = "_".join(name_words)
    # reformat command def with new name, no self
    new_code = re.sub(r"    def command\(self(,)?( )?","def {}(".format(new_name), code)
    return new_name, new_code

# walk over an AST and produce 1) list of flat command definitions
# 2) dict that maps command titles unto new def names (e.g., "add_two_numbers")
def extract_source_and_names(ast):
    source_list = []
    name_map = {}
    # grab all iris commands from AST
    functions = extract_functions(ast)
    for f in functions:
        # get the name of the iris command class
        class_name = f.__parent__.__class__.__name__
        # get command source from either hidden attribute (for dynamically defined)
        # or inspect for commands in the source
        if f.__parent__.__source_code__:
            code = f.__parent__.__source_code__
        else:
            code = "".join(inspect.getsourcelines(f.command)[0])
        # produced renamed flat source and new command name
        new_name, new_code = rename_code(class_name, code)
        # add new name to lookup table
        name_map[f.title] = new_name
        # don't return flat command source for certain special case / meta functions
        # TODO: this is very hacky, depends on the current name of the command. fix
        if new_name in ["store_command"]: continue # special cases
        source_list.append(new_code)
    return source_list, name_map

# this function selects for values that can be representated by raw values, e.g. "2" in a program
def is_primitive(value):
    primitives = [int, str, float]
    if any([isinstance(value,y) for y in primitives]):
        return True
    return False

# retrun concrete representation for data values passed as arguments to commands
# for simple/primitive data e.g. "2" a raw string data
# for environment variables a lookup from a table that represents iris env state
def transform_value(value):
    if is_primitive(value):
        if isinstance(value, str):
            return "\"{}\"".format(value)
        return str(value)
    elif isinstance(value, iris_objects.EnvReference):
        return "iris_env[\"{}\"]".format(value.name)
    else:
        return "junk"
        #raise Exception("AST value {} not supported".format(value))

# transform single AST iris command into python code
# "name_map" holds mapping of command title to its new name in the flat source that will be generated
def walk_transform_ast(ast, name_map):
    # top level is just function application
    open_call = "{}(".format(name_map[ast.title])
    args = []
    for arg in ast.command_args:
        if arg in ast.binding_machine:
            # if it's a function, recurse for composed application
            if isinstance(ast.binding_machine[arg], sm.Function):
                args.append(walk_transform_ast(ast.binding_machine[arg], name_map))
            # otherwise get the python representation of a value
            elif isinstance(ast.binding_machine[arg], sm.ValueState):
                args.append(transform_value(ast.binding_machine[arg].value))
            # Not a problem that these are not implemented, as long as not available in production
            elif isinstance(ast.binding_machine[arg], sm.Block):
                # TODO: actually implement!
                args.append("{BLOCK}")
            elif isinstance(ast.binding_machine[arg], sm.If):
                # TODO: actually implement!
                args.append("{IF}")
            elif isinstance(ast.binding_machine[arg], sm.While):
                # TODO: actually implement!
                args.append("{WHILE}")
            else:
                raise Exception("Cannot transform AST node class {}".format(ast.binding_machine[arg].__class__))
        else:
            raise Exception("AST argument not bound {}".format(arg))
    # in function application, arguments are joined on commas
    package_args = ",".join(args)
    close_call = open_call + package_args + ")"
    return close_call

# generate python code for a single AST
# pull out flat command representations necessary to execute AST, then the composed expresions
def transform_ast(ast):
    f_list, name_map = extract_source_and_names(ast)
    return "\n".join(f_list) + "\n" + walk_transform_ast(ast, name_map)


# this is overwriting a command to save variables in the iris env (e.g. "save that to my_num")
# with logic that performs assignment in python
# TODO: hacky, fix
iris_script_prepend = """iris_env = {}
def store_command(value, name):
    iris_env[name] = value
"""

# generate a script from a full conversatino (list of asts)
def make_script(asts):
    # prepend special cases
    out = iris_script_prepend
    f_list = []
    name_map = {}
    # gather all functions used, and how they should be referenced
    for ast in asts:
        f_list_t, name_map_t = extract_source_and_names(ast)
        f_list += f_list_t
        name_map = {**name_map, **name_map_t}
    # only need to declare a function once, remove duplicates
    for f in set(f_list):
        out += f #+ "\n"
    # now simulate Iris' memory (arguments in these functions must be allowed to access the last expression
    # through a variable). In future, could transform this aspect in more fancy way
    for ast in asts:
        out += "iris_env[\"__MEMORY__\"]={}".format(walk_transform_ast(ast, name_map)) + "\n"
    return out
