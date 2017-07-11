from aiohttp import web
import json
import os
import sys
sys.path.insert(0, os.path.abspath('..'))
import aiohttp_cors
from iris import EventLoop
from iris import state_machine as sm
import util

# import all the Iris commands we care about
from iris import stdlib
from user_functions import *

# these imports are here because we are evaluating IrisCommands that need them
from iris import IrisCommand
from iris import iris_objects
from iris import state_types as t

# initialize server stuff
PORT = int(os.environ.get("PORT", 8000))
app = web.Application()
cors = aiohttp_cors.setup(app)

# initialize Iris stuff
state_machine = EventLoop()
iris = sm.IRIS_MODEL#IRIS
iris.train_model()

def add_cors(route):
    cors.add(route, {"*": aiohttp_cors.ResourceOptions(
                 allow_credentials=True,
                 expose_headers="*",
                 allow_headers="*")})

# this route governs main state machine loop
async def new_loop(request):
    question = await request.json()
    response = state_machine.state_machine(question)
    # TODO: possibly encapsulate this into a helper function
    # this is also constucting JSON to be read by the JS reducer, so a bit weird
    response["origin"] = "iris"
    response["type"] = "ADD_SERVER_MESSAGE"
    response["variables"] = util.env_vars(iris)
    return web.json_response(response)

add_cors(app.router.add_route('POST', '/new_loop', new_loop))

# retrieve documentation object for function query
# TODO: probably this should be updated so that we are not using the logistic regression model as retrieval mechanism
async def docs(request):
    question = await request.json()
    text = question["text"]
    query = iris.predict_commands(text)
    # if there are results...
    if len(query) > 0:
        class_instance = query[0][0]
        doc_obj = class_instance.docs()
    # else empty doc object
    # TODO: not at all clear that "" title represents empty, possibly fix on backend
    else:
        doc_obj = {"title":""}
    return web.json_response({"doc":doc_obj})

add_cors(app.router.add_route('POST', '/docs', docs))

# this route returns the json representation of a command for the command edit pane
# TODO: again, probably shouldn't use logistic regression for retrieval
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

# this route evaluates a new Iris command created in the command editor
# TODO: change route name
async def function_test(request):
    data = await request.json()
    class_string, command_source_metadata, explanation_source_metadata = util.make_class_text(
        data['name'],
        data['title'],
        data['command'],
        data['explanation'],
        data['args'],
        data['examples'])
    try:
        exec(class_string)
        exec(command_source_metadata)
        exec(explanation_source_metadata)
        # if all that worked, then no error
        error = False
        error_string = "" # TODO: could we just set the error field below to None?
        base_str = """from iris import state_types as t
from iris import IrisCommand\n
from iris import iris_objects"""
        # write this file to user_functions directory
        with open("user_functions/{}.py".format(data['name']),'w') as f:
            f.write(base_str+"\n"+class_string+"\n")
        # update model to include the new command
        iris.train_model()
    except:
        # unpackage the error object
        error_obj = sys.exc_info()
        error = True
        error_string = str(error_obj[1])
    return web.json_response({"func_string":class_string, "error":{"present":error, "error_string":error_string}})

add_cors(app.router.add_route('POST', '/function_test', function_test))

# this route returns a list of functions given a text search term (for documentation)
# TODO: make this better than simple string inclusion...
async def function_list(request):
    question = await request.json()
    text = question["text"]
    return web.json_response([x[0].title().lower() for x in iris.class2cmd.values() if text in x[0].title().lower()])

add_cors(app.router.add_route('POST', '/function_list', function_list))

# this route returns a list of hints/predictions given the current user input state
async def hint(request):
    question = await request.json()
    text = question["text"]
    formatted_list = []
    response = state_machine.hint(text)
    for r in response:
        if isinstance(r,dict):
            formatted_list.append(r)
        else:
            # this formatting is to control which hint is bold
            formatted_list.append({"style":"normal", "text":r})
    return web.json_response({"predictions": formatted_list})

add_cors(app.router.add_route('POST', '/hint', hint))

# this route returns the current set of variables in the Iris environment
async def variables(request):
    # again, this maps directly onto a react reducer, somewhat weird
    response = {"type": "UPDATE_VARIABLES", "variables": util.env_vars(iris)}
    return web.json_response(response)

add_cors(app.router.add_route('GET', '/variables', variables))

# this route returns the conversation history (all previous conversations)
async def history(request):
    response = {"type": "UPDATE_HISTORY", "conversation": iris.history}
    return web.json_response(response)

add_cors(app.router.add_route('GET', '/history', history))

# this route sets conversation history on the backend
# TODO: this looks like the frontend is making a decision about when a convo is over, is that true?
async def set_history(request):
    history = await request.json()
    iris.set_history(history)
    response = {"type": "UPDATE_HISTORY", "conversation": iris.history}
    return web.json_response(response)

add_cors(app.router.add_route('POST', '/set_history', set_history))

# serve the resources under static
app.router.add_static("/static", "static/")

# run the server
web.run_app(app,port=PORT)
