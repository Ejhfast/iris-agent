import fetch from 'isomorphic-fetch';
import dispatch from '../index.js';
import { updateCodeEditor } from '../actions/index.js';

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
        dispatch(json);
        dispatch({'type': 'UPDATE_VARIABLES', 'variables': json.variables});
    })
    .then(() => {
        dispatch({'type': 'UPDATE_PREDICTIONS', 'predictions': [] });
    });
};

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
        dispatch({'type': 'UPDATE_PREDICTIONS', 'predictions': json.predictions});
    });
};

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
        // dispatch({'type': 'UPDATE_RESULTS', 'results': json});
    });
};

export const setHistory = (messages, state, conversation) => {
    fetch('http://localhost:8000/set_history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({messages, state, conversation})
    });
};

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

// export default { postMessages, getVariables };
