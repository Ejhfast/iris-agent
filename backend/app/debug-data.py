import fileinput
import os
import sys
sys.path.insert(0, os.path.abspath('..'))
from iris import util
for i,line in enumerate(fileinput.input()):
    cols = util.split_line(line)
    if i == 0:
        print(cols)
    if len(cols) != 20491:
        print(i)
