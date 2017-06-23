# from .state_machine import StateMachine, UnwrapFunction, Function, ExplainMiddleware, DoAll, Print
# from . import iris_objects
# from . import util
#
from .state_machine import IrisCommand

# class IrisCommand(Function):
#     argument_help = {}
#     def __init__(self, index_command=True):
#         super().__init__()
#         if index_command:
#             self.class_index = self.iris.add_command(self)
#         for arg in self.command_args:
#             if not arg in self.argument_types:
#                 raise Exception("{} needs an argument type".format(arg))
#         self.add_help()
#     def next_state_base(self, text):
#         next_state = super().next_state_base(text)
#         if not isinstance(next_state, StateMachine):
#             ret_val = next_state.value
#             program = next_state.program
#             if isinstance(ret_val, StateMachine):
#                 return ret_val
#             print_out = self.wrap_explanation(ret_val)
#             succ, learning = self.iris.learn(self, self.generate_name_bindings())
#             if succ:
#                 print_out.append("I learned \"{}\"".format(learning))
#             return DoAll([Print(print_out)]).when_done(self.get_when_done_state())
#         return next_state
#     def add_help(self):
#         for arg, type in self.argument_types.items():
#             if arg in self.argument_help:
#                 help_state = self.argument_help[arg]
#             else:
#                 help_state = "No help available for this argument."
#             self.argument_types[arg].add_middleware(ExplainMiddleware(help_state, arg))
#     def explanation(self, result):
#         return result
#     def wrap_explanation(self, result):
#         results = self.explanation(result)
#         out = []
#         for r in util.single_or_list(results):
#             if isinstance(r, iris_objects.IrisImage):
#                 out.append({"type": "image", "value": r.value})
#             elif isinstance(r, iris_objects.FunctionWrapper):
#                 out.append("<Bound function: {}>".format(r.name))
#             elif util.is_data(r):
#                 out.append({"type": "data", "value": util.prettify_data(r)})
#             else:
#                 out.append(str(r))
#         return out
