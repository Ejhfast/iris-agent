import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function addMessage(message) {
    return {
        type: types.ADD_MESSAGE,
        ...message
    };
}

export function addInputHistory(message) {
    return {
        type: types.ADD_INPUT_HISTORY,
        ...message
    };
}

export function moveInputHistory(message) {
    return {
        type: types.MOVE_INPUT_HISTORY,
        ...message
    };
}

export function hint(message) {
    return {
        type: types.HINT,
        ...message
    };
}

export function updateFunc(message) {
    return {
        type: types.UPDATE_FUNC,
        ...message
    };
}

export function updateResults(message) {
    return {
        type: types.UPDATE_RESULTS,
        ...message
    };
}

export function updateDocEvent(message) {
    return {
        type: types.UPDATE_DOCS,
        ...message
    };
}

export function setDocs(message) {
    return {
        type: types.SET_DOCS,
        ...message
    };
}

export function setCodeEdit(message) {
    return {
        type: types.SET_CODE_EDIT,
        ...message
    };
}

export function updateCodeEditor(name, value) {
    return {
        type: types.UPDATE_CODE_EDITOR,
        value: value,
        name: name
    };
}

export function addCommandArg() {
    return {
        type: types.ADD_COMMAND_ARG,
    };
}

export function addExample() {
    return {
        type: types.ADD_COMMAND_EXAMPLE,
    };
}

export function updateCommandArg(id, values) {
    return {
        type: types.UPDATE_COMMAND_ARG,
        id,
        values:values
    };
}

export function deleteCommandArg(id) {
    return {
        type: types.DELETE_COMMAND_ARG,
        id,
    };
}

export function deleteCommandExample(id) {
    return {
        type: types.DELETE_COMMAND_EXAMPLE,
        id,
    };
}

export function updateCommandExample(id, text) {
    return {
        type: types.UPDATE_COMMAND_EXAMPLE,
        id,
        text,
    };
}

export function storeCurrentInput(input) {
    return {
        type: types.STORE_CURRENT_INPUT,
        currentInput: input
    };
}

export function hideConversation(id) {
    return {
        type: types.HIDE_CONVERSATION,
        id
    };
}

export function resetCommand() {
    return {
        type: types.RESET_COMMAND,
    };
}
