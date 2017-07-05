import fetch from 'isomorphic-fetch';
import dispatch from '../index.js';
import { updateCodeEditor, updatePredictions, updateVariables } from '../actions/index.js';


// This is the primary interface through which the client interacts with the state machine
// TODO: rename, remove dispatch directly on server JSON
export const postMessages = (messages, state, conversation) => {
    fetch('http://localhost:8000/new_loop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({messages, state, conversation})
    })
    .then(response => response.json())
    .then(json => {
        dispatch(json); // what is this??
        dispatch(updateVariables(json.variables));
    })
    .then(() => {
        dispatch(updatePredictions([]));
    });
};

// This API supports hint updates given current user input text
export const updateHint = (text) => {
    fetch('http://localhost:8000/hint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        dispatch(updatePredictions(json.predictions));
    });
};

// This API supports documenation retrieval based on a clicked-upon function title
// TODO: use action from actions/index
// TODO: what is in json.doc?
export const updateDocs = (text) => {
    fetch('http://localhost:8000/docs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        dispatch({'type': 'UPDATE_DOCS', 'doc': json.doc});
        // dispatch({'type': 'UPDATE_COMMAND', 'command': json.command});

    });
};

// This API supports command search in the documentation pane
// TODO: use action from actions/index
export const doSearch = (text) => {
    fetch('http://localhost:8000/function_list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    })
    .then(response => response.json())
    .then(json => {
        console.log("UPDATE RESULTS", json);
        dispatch({'type': 'UPDATE_RESULTS', 'results': json});
    });
};

// This API loads command data into the command edit pane
// TODO: use action from actions/index
export const updateCommandAPI = (text) => {
    fetch('http://localhost:8000/command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    })
    .then(response => response.json())
    .then(json => {
        console.log("command", json);
        dispatch({'type': 'UPDATE_COMMAND', 'command': json.command});
    });
};

// This API supports user command compilation on the backend
export const testFunction = (text) => {
    console.log(text);
    fetch('http://localhost:8000/function_test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(text)
    })
    .then(response => response.json())
    .then(json => {
        console.log("UPDATE Test", json);
        dispatch(updateCodeEditor('preview', json.func_string));
        dispatch(updateCodeEditor('error', json.error.error_string));
    });
};

// TODO: what is this API for?
export const setHistory = (messages, state, conversation) => {
    fetch('http://localhost:8000/set_history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({messages, state, conversation})
    });
};

// This API retrieves environment variables from the backend server
// TODO: replace raw dispatch on json
export const getVariables = () => {
    fetch('http://localhost:8000/variables', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => dispatch(json));
};

// This API gets the full conversation history from the backend server
// TODO: replace raw dispatch on json
export const getHistory = () => {
    fetch('http://localhost:8000/history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => dispatch(json));
};
