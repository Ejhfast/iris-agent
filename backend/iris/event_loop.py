from . import state_machine as sm
from . import util
from .state_machine import IRIS_MODEL
from .gencode import make_script

# this class is a middleman API between automata execution and the frontend
class EventLoop:
    def __init__(self, iris = IRIS_MODEL):
        # initiate with an automata that will call any given command from user request
        self.machine = sm.StateMachineRunner(sm.ApplySearch())
        self.iris = IRIS_MODEL
        # store ASTs in iris env as we go
        self.iris.env["ASTS"] = []
    # helper method to end a current top-level interaction/conversation
    # top-level means that the convo initiated from a new user request, not as a subcomponent of some other conversation (e.g., a composition)
    def end(self, outputs):
        # grap the command associated with the original iris command executed
        # this is a link back to the initial automata in the sequence
        # above, you can see this is an ApplySearch automata, which will find and execute a command for the user
        # this automata stores the command it executes in a .command attribute # TODO: make explicit API
        cmd_object = self.machine.original_state.command
        # grab command title and string representation of the resolved arguments
        label = cmd_object.title.upper()
        arg_map = cmd_object.generate_name_bindings()
        # reset the state machine runner
        self.machine.reset()
        # __MEMORY_FUNC__ is an AST representation of the last executed command
        # we will create and expose a list of these in the iris environment, so that commands can interact with it
        # to "produce a script of this conversation", for example
        self.iris.env["ASTS"].append(self.iris.env["__MEMORY_FUNC__"])
        # include a "label" and "arg_map" in response data, so that frontend can construct a title component
        return {"state":"START", "text": outputs, "label":label, "arg_map": arg_map, "history": self.iris.history["history"] }
    # pass through hint request to underlying automata
    def hint(self, text):
        # check for metacommands before processing further
        # TODO: refactor
        if "quit" in text:
            return ["quit"]
        if "help" in text:
            return ["help"]
        future_text = self.machine.current_state.hint(text)
        return future_text
    # metacommands override everything else! TODO: change from simple text match
    # TODO: this is not currently working, so remove or fix
    def check_for_metacommand(self, text):
        if "go back" in text and False:
            self.machine.go_back()
            outputs = self.machine.current_output()
            return True, {"state": "RECURSE", "text": outputs}
        # if user wants to quick current interaction, reset automata and send message to frontend
        elif "quit" in text:
            self.machine.reset()
            # "state":"Start" means the current interaction is over
            # TODO: change this protocol, left over from forever ago
            return True, {"state":"START", "text": ["Okay, what would you like do do?"], "history": self.iris.history["history"]}
        return False, None
    # TODO: change name
    # this wraps the main logic layer between user input and automata state
    def state_machine(self, data):
        outputs = []
        text, class_index = util.get_last_message(data["messages"])
        # if there is a metacommand registered in the input, no need to do anything else
        check, ret_val = self.check_for_metacommand(text)
        if check:
            return ret_val
        # otherwise, first we run the automata as far as it will go without input
        self.machine.run_until_input_required()
        # then we pass it the input
        keep_going = self.machine.next_state(text, class_index)
        # then we append any outputs to the response
        for o in self.machine.current_output():
            outputs.append(o)
        # now that the automata has processed user input and produced output (moved one step forward)
        # run it again until it needs more input
        keep_going, more_outputs = self.machine.run_until_input_required()
        # if at that point it finished running, end the current interaction
        if not keep_going:
            return self.end(outputs + more_outputs)
        # otherwise display output to user and collect more input
        # "state":"Recurse" means to continue the interaction
        return {"state": "RECURSE", "text": outputs + more_outputs}
