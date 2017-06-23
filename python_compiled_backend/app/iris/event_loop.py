from . import state_machine as sm
from . import util
from .state_machine import IRIS_MODEL
from .gencode import make_script

class EventLoop:
    def __init__(self, iris = IRIS_MODEL):
        self.machine = sm.StateMachineRunner(sm.ApplySearch())
        self.iris = IRIS_MODEL
        self.iris.env["ASTS"] = []
        self.asts = []
    def end(self, outputs):
        cmd_object = self.machine.original_state.command
        label = cmd_object.title.upper()
        arg_map = cmd_object.generate_name_bindings()
        self.machine.reset()
        self.asts.append(self.iris.env["__MEMORY_FUNC__"])
        self.iris.env["ASTS"].append(self.iris.env["__MEMORY_FUNC__"])
        print("END AST:", self.iris.env["__MEMORY_FUNC__"])
        make_script(self.asts)#.pretty_print()
        return {"state":"START", "text": outputs, "label":label, "arg_map": arg_map, "history": self.iris.history["history"] }
    def hint(self, text):
        future_text = self.machine.current_state.hint(text)
        return future_text
    def check_for_metacommand(self, text):
        if "go back" in text:
            self.machine.go_back()
            outputs = self.machine.current_output()
            return True, {"state": "RECURSE", "text": outputs}
        elif "quit" in text:
            self.machine.reset()
            return True, {"state":"START", "text": ["Okay, what would you like do do?"], "history": self.iris.history["history"]}
        return False, None
    def state_machine(self, data):
        outputs = []
        text = util.get_last_message(data["messages"])
        check, ret_val = self.check_for_metacommand(text)
        if check:
            return ret_val
        self.machine.run_until_input_required()
        keep_going = self.machine.next_state(text)
        for o in self.machine.current_output():
            outputs.append(o)
        keep_going, more_outputs = self.machine.run_until_input_required()
        if not keep_going:
            return self.end(outputs + more_outputs)
        return {"state": "RECURSE", "text": outputs + more_outputs}
