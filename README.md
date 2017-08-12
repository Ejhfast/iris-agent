# Iris: A Conversational Agent for Data Science

![interface](/interface.png)

Read more about the system [in this article](https://hackernoon.com/a-conversational-agent-for-data-science-4ae300cdc220).

## Command DSL

You can add commands to Iris using an in-editor GUI or work directly with the Python DSL. For example:

```python
from iris import state_types as t
from iris import IrisCommand

class GenerateArray(IrisCommand):
    # what iris will call the command + how it will appear in a hint
    title = "generate a random array of {n} numbers"
    
    # give an example for iris to recognize the command
    examples = ["generate numpy array of size {n}"]
    
    # type annotations for each command argument, to help Iris collect missing values from a user
    argument_types = {"n":t.Int("Please enter size of array:")}
    
    # core logic of the command
    def command(self, n):
        import numpy
        return numpy.random.randint(100, size=n)
        
    # wrap the output of a command to display to user
    # by default this will be an identity function
    # each element of the list defines a separate chat bubble
    def explanation(self, result):
        return ["Here are the numbers", result]
```

## Installation guide

### Warning! The current version of Iris is an alpha release. We are still adding many new commands to the system and fixing bugs. A production-ready beta release will be out later this summer. Use at your own risk!

These are instructions to install and run Iris in debugging mode. A self-contained Electron app for OSX will be released later this summer.

You will first need to [install anaconda](https://conda.io/docs/install/quick.html). (Make sure to run `source ~/.bash_profile` after you have installed Anaconda, if it is not appearing in your path.)

Install and run the Python components:

    cd iris-agent/backend
    # create new conda env called iris with necessary packages
    conda create --name iris --file packages.txt
    # enter the conda env
    source activate iris
    # install the remaining pip packages
    pip install -r requirements.txt
    cd app/
    # run the backend application
    python app.py

Install and run the Javascript components. If you do not already have webpack, run `npm install webpack -g`:

    cd iris-agent
    npm install
    # build JS app with webpack (can also run webpack --watch in seperate command window)
    webpack
    # start electron (this will open the application automatically)
    npm start

Both the backend and frontend must be running for Iris to work!

### Tests

To verify the backend is working:

    cd iris-agent/backend/test
    python test.py
