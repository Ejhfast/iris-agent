import sys
import os
sys.path.insert(0, os.path.abspath('..'))
from iris import state_machine as sm
from iris import state_types as t
from iris import EventLoop

# import all the Iris commands we care about
from iris import stdlib
from app import stdlib

# initialize Iris stuff

# tests!
import unittest

def mock_data_formatter(messages):
    return { "messages":  [{ "text":m, "class_index": None } for m in messages] }

def append_mock_message(message, data):
    return { "messages": data['messages'] + [{ "text": message, "class_index": None }] }

class TestUM(unittest.TestCase):

    def setUp(self):
        self.eventLoop = EventLoop()
        self.iris = sm.IRIS_MODEL#IRIS
        self.iris.set_learning(False) # don't learn from interactions here
        self.iris.train_model()

    def test_basic_command_interaction(self):
        data_out = self.eventLoop.state_machine(mock_data_formatter(["add 3 and 4"]))
        # test completed convo
        self.assertEqual(data_out["state"], "START")
        # test for correct argument bindings
        self.assertEqual(data_out['arg_map']['x'], '3')
        self.assertEqual(data_out['arg_map']['y'], '4')
        # test for correct title creation
        self.assertEqual(data_out['label'], 'ADD TWO NUMBERS: {X} AND {Y}')
        # test for correct response
        self.assertEqual(data_out['text'][-1], '7.0')

    def test_argument_request(self):
        messages = mock_data_formatter(["add two numbers"])
        data_out = self.eventLoop.state_machine(messages)
        # test recurse and ask for first argument
        self.assertEqual(data_out['state'], 'RECURSE')
        # test give first argument, and ask for second argument
        messages = append_mock_message("3", messages)
        data_out = self.eventLoop.state_machine(messages)
        self.assertEqual(data_out['state'], 'RECURSE')
        # test give second argument, and complete
        messages = append_mock_message("6", messages)
        data_out = self.eventLoop.state_machine(messages)
        self.assertEqual(data_out['state'], 'START')
        self.assertEqual(data_out['text'][-1], '9.0')

    def test_argument_request_composition(self):
        messages = mock_data_formatter(["add two numbers"])
        data_out = self.eventLoop.state_machine(messages)
        # test recurse and ask for first argument
        self.assertEqual(data_out['state'], 'RECURSE')
        # test give composed command, and ask for second argument
        messages = append_mock_message("add 1 and 3", messages)
        data_out = self.eventLoop.state_machine(messages)
        # asser new request
        self.assertEqual(data_out['state'], 'RECURSE')
        # assert correct execution of composed command
        self.assertEqual(data_out['text'][-2], '4.0')
        messages = append_mock_message("11", messages)
        data_out = self.eventLoop.state_machine(messages)
        # assert command end and correct answer
        self.assertEqual(data_out['state'], 'START')
        self.assertEqual(data_out['text'][-1], '15.0')

    def test_variable_assignment(self):
        data_out = self.eventLoop.state_machine(mock_data_formatter(["add 3 and 4"]))
        # test completed convo
        self.assertEqual(data_out["state"], "START")
        data_out = self.eventLoop.state_machine(mock_data_formatter(["save that to my_num"]))
        # test completed convo
        self.assertEqual(data_out["state"], "START")
        # test correct bindings
        self.assertEqual(data_out['arg_map']['name'], 'my_num')
        self.assertEqual(data_out['arg_map']['value'], 'that')
        # test that variable appeared in environment
        self.assertEqual(self.iris.env['my_num'], 7.0)
        # test that variable can be referenced in future commands
        data_out = self.eventLoop.state_machine(mock_data_formatter(["add my_num and 4"]))
        self.assertEqual(data_out["state"], "START")
        self.assertEqual(data_out["text"][-1], "11.0")

    # add test for class_index backdoor

if __name__ == '__main__':
    unittest.main()
