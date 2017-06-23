from . import state_machine as sm
from .state_machine import types as t
from . import util

def test_timetravel_simple():
    two_questions = t.YesNo("Are you happy?",
        yes=sm.DoAll([sm.Print(["Okay, great."]), sm.ValueState("Done")]),
        no=t.YesNo("Are you sad?",
            yes="I'm sorry.",
            no="Well, that's something."))
    runner = sm.StateMachineRunner(two_questions)
    # FIST WE RUN UNTIL INPUT NEEDED
    keep_going = runner.run_until_input_required()
    print("Running until input", runner.current_output())
    # NOW WE GIVE INPUT (assume keep going)
    first_input = "yes"
    print("Give machine yes")
    keep_going = runner.next_state("yes")
    keep_going = runner.run_until_input_required()
    print("Run until input again")
    print("Output after our input:", runner.current_state)
    runner.go_back()
    print("=====")
    print("Went back until input required", runner.current_output())
    # NOW WE GIVE INPUT (assume keep going)
    first_input = "yes"
    print("Give machine yes")
    keep_going = runner.next_state("yes")
    keep_going = runner.run_until_input_required()
    print("Run until input again")
    print("Output after our input:", runner.current_state)
    # runner.go_back()
    # keep_going = runner.next_state("yes")
    # print(keep_going, runner.current_state)
    #print(runner.current_output())

def run_tests():
    print(util.split_with_quotes("this is my \"is the best\" yeah"))
    print(util.split_with_quotes("this is my \"is the best' yeah"))
    print(util.split_with_quotes("this is,my,\"is the best',yeah", delim=","))
    print(util.split_with_quotes("this is,my,\"is the, best',yeah", delim=","))
