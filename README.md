# iris-agent

Install the Python components:

    cd iris-agent/backend
    # create new conda env called iris with necessary packages
    conda create --name iris --file package.txt
    # enter the conda env
    source activate iris
    # install the remaining pip packages
    pip install -r requirements.txt
    cd app/
    # run the backend application
    python app.py

Install the Javascript components:

    cd iris-agent/app
    npm install
    # build JS app with webpack (can also run webpack --watch in seperate command window)
    webpack 
    # start electron (this will open the application automatically)
    npm start
