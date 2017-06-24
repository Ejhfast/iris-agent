from aiohttp import web
import json
import os
import sys
import aiohttp_cors
sys.path.insert(0, os.path.abspath('..'))
from iris import stdlib
from iris import EventLoop
from iris import state_machine as sm
from iris import IrisCommand
from iris import state_types as t
import util
from collections import defaultdict
from sklearn.linear_model import LogisticRegression
import inspect
from user_functions import *


PORT = int(os.environ.get("PORT", 8000))

app = web.Application()

cors = aiohttp_cors.setup(app)

content = None

state_machine = EventLoop()
# IRIS.train_model()
iris = sm.IRIS_MODEL#IRIS
iris.train_model()

def add_cors(route):
    cors.add(route, {"*": aiohttp_cors.ResourceOptions(
                 allow_credentials=True,
                 expose_headers="*",
                 allow_headers="*")})

def parse_args(messages):
    fail_indexes = [i for i,x in enumerate(messages) if x["origin"] == "iris" and x["type"] == "ask" ]
    args = {}
    for i in fail_indexes:
        iris_ask = messages[i]["text"]
        var = iris_ask.split()[-1][:-1]
        args[var] = messages[i+1]["text"]
    return args

# NEW FUNCS

async def process_csv(request):
    global content
    data = await request.post()
    csv = data['csv']
    filename = csv.filename
    content = csv.file.read().decode('utf-8').split('\n')
    data_types = util.rows_and_types(content)
    return web.Response(status=302, headers={"Location":"http://localhost:3000/select_data?data={}".format(json.dumps(data_types))})

add_cors(app.router.add_route('POST', '/upload_react', process_csv))

# END

async def new_loop(request):
    question = await request.json()
    response = state_machine.state_machine(question)
    response["origin"] = "iris"
    response["type"] = "ADD_SERVER_MESSAGE"
    response["variables"] = util.env_vars(iris)
    #print("response", response)
    return web.json_response(response)

add_cors(app.router.add_route('POST', '/new_loop', new_loop))

async def docs(request):
    question = await request.json()
    text = question["text"]
    query = iris.predict_commands(text)
    print(query)
    if len(query) > 0:
        class_instance = query[0][0]
        doc_obj = class_instance.docs()
    else:
        doc_obj = {"title":""}
    return web.json_response({"doc":doc_obj})

add_cors(app.router.add_route('POST', '/docs', docs))

async def command(request):
    question = await request.json()
    text = question["text"]
    query = iris.predict_commands(text)
    if len(query) > 0:
        class_instance = query[0][0]
        cmd_obj = util.command2obj(class_instance)
    else:
        cmd_obj = None
    return web.json_response({"command":cmd_obj})

add_cors(app.router.add_route('POST', '/command', command))

async def function_test(request):
    data = await request.json()
    print(data)
    outs, extra, extra_explain = util.make_class_text(data['name'], data['title'], data['command'], data['explanation'], data['args'], data['examples'])
    error = False
    error_string = ""
    try:
        exec(outs)
        exec(extra)
        exec(extra_explain)
        base_str = """from iris import state_types as t
from iris import IrisCommand\n"""
        with open("user_functions/{}.py".format(data['name']),'w') as f:
            f.write(base_str+"\n"+outs+"\n")
        print(outs)
        iris.train_model()
    except:
        error_obj = sys.exc_info()
        error = True
        error_string = str(error_obj[1])
        print(str(error_obj[1]))
    return web.json_response({"func_string":outs, "error":{"present":error, "error_string":error_string}})

add_cors(app.router.add_route('POST', '/function_test', function_test))


async def function_list(request):
    question = await request.json()
    text = question["text"]
    return web.json_response([x[0].title().lower() for x in iris.class2cmd.values() if text in x[0].title().lower()])

add_cors(app.router.add_route('POST', '/function_list', function_list))

async def hint(request):
    question = await request.json()
    text = question["text"]
    formatted_list = []
    if False: #text == "":
        response = []
    else:
        response = state_machine.hint(text)
        for r in response:
            if isinstance(r,dict):
                formatted_list.append(r)
            else:
                formatted_list.append({"style":"normal", "text":r})
    return web.json_response({"predictions": formatted_list})

add_cors(app.router.add_route('POST', '/hint', hint))

async def variables(request):
    response = {"type": "UPDATE_VARIABLES", "variables": util.env_vars(iris)}
    return web.json_response(response)

add_cors(app.router.add_route('GET', '/variables', variables))

async def history(request):
    response = {"type": "UPDATE_HISTORY", "conversation": iris.history}
    return web.json_response(response)

add_cors(app.router.add_route('GET', '/history', history))

async def set_history(request):
    question = await request.json()
    iris.set_history(question)
    response = {"type": "UPDATE_HISTORY", "conversation": iris.history}
    return web.json_response(response)

add_cors(app.router.add_route('POST', '/set_history', set_history))

async def import_data(request):
    data = await request.post()
    column_data = defaultdict(dict)
    for k,v in data.items():
        key = "_".join(k.split("_")[:-1])
        index = int(k.split("_")[-1])
        column_data[index][key] = v
    for i in column_data.keys():
        column_data[i]["name"] = column_data[i]["name"].lower()
    env = util.process_data(column_data, content)
    for k,vs in env.items():
        iris.env[k] = vs
        iris.env_order[k] = len(iris.env_order)
    return web.Response(status=302, headers={"Location":"http://localhost:3000/"})

add_cors(app.router.add_route('POST', '/import_data', import_data))

async def classify_query(request):
    data = await request.post()
    query = data["query"]
    results = iris.best_n(query)
    return web.json_response(results)

add_cors(app.router.add_route('POST', '/classify', classify_query))

async def execute_function(request):
    data = await request.post()
    ex_class = data["class"]
    args = json.loads(data["args"])
    print(ex_class,args)
    execution = iris.call_class(int(ex_class), args)
    return web.json_response({"result": str(execution)})

add_cors(app.router.add_route('POST', '/execute', execute_function))

app.router.add_static("/static", "static/")

web.run_app(app,port=PORT)
