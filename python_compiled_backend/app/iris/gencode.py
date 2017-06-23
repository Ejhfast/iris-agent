from . import state_machine as sm
import inspect
import re
from . import iris_objects

def extract_functions(ast, functions=[]):
    new_functions = [ast]
    for arg in ast.command_args:
        if arg in ast.binding_machine:
            if isinstance(ast.binding_machine[arg], sm.Function):
                new_functions = new_functions + extract_functions(ast.binding_machine[arg])
    return new_functions

def rename_code(class_name, code):
    name_words = [x.lower() for x in re.findall('[A-Z][^A-Z]*', class_name)]
    new_name = "_".join(name_words)
    new_code = re.sub(r"    def command\(self(,)?( )?","def {}(".format(new_name), code)
    return new_name, new_code

def extract_source_and_names(ast):
    source_list = []
    name_map = {}
    functions = extract_functions(ast)
    for f in functions:
        class_name = f.__parent__.__class__.__name__
        code = "".join(inspect.getsourcelines(f.command)[0])
        new_name, new_code = rename_code(class_name, code)
        name_map[f.title] = new_name
        if new_name in ["store_command"]: continue # special cases
        source_list.append(new_code)
    return source_list, name_map

def is_primitive(value):
    primitives = [int, str, float]
    if any([isinstance(value,y) for y in primitives]):
        return True
    return False

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

def walk_transform_ast(ast, name_map):
    open_call = "{}(".format(name_map[ast.title])
    args = []
    for arg in ast.command_args:
        if arg in ast.binding_machine:
            if isinstance(ast.binding_machine[arg], sm.Function):
                args.append(walk_transform_ast(ast.binding_machine[arg], name_map))
            elif isinstance(ast.binding_machine[arg], sm.ValueState):
                args.append(transform_value(ast.binding_machine[arg].value))
            else:
                raise Exception("Cannot transform AST node class {}".format(arg.__class__))
        else:
            raise Exception("AST argument not bound {}".format(arg))
    package_args = ",".join(args)
    close_call = open_call + package_args + ")"
    return close_call

def transform_ast(ast):
    f_list, name_map = extract_source_and_names(ast)
    return "\n".join(f_list) + "\n" + walk_transform_ast(ast, name_map)

iris_script_prepend = """iris_env = {}
def store_command(value, name):
    iris_env[name] = value
"""

def make_script(asts):
    out = iris_script_prepend
    f_list = []
    name_map = {}
    for ast in asts:
        f_list_t, name_map_t = extract_source_and_names(ast)
        f_list += f_list_t
        name_map = {**name_map, **name_map_t}
    for f in set(f_list):
        out += f #+ "\n"
    for ast in asts:
        out += "iris_env[\"__MEMORY__\"]={}".format(walk_transform_ast(ast, name_map)) + "\n"
    return out
