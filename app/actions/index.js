// Actions are typed objects passed to the redux reducer that manages state transformations
// TODO: potentially break this file into multiple files, one for each reducer action-set

import * as types from './types';


// The conversation reducer governs display of main conversational window
// This window contains multiple conversations, where each conversation is defined by a top-level command call

// Add a message to the current conversation
export function addMessage(message) {
    return {
        type: types.ADD_MESSAGE,
        ...message
    };
}

// Toggle whether a conversation is visible in the chat history
export function hideConversation(id) {
    return {
        type: types.HIDE_CONVERSATION,
        id
    };
}

// -----------------------------------------------

// The commandEditPane reducer governs state for the commmand editing GUI

// Update any field (name) of the command editor with a new value (value)
// TODO: documentation of command editor state structure outside of reducer?
export function updateCodeEditor(name, value) {
    return {
        type: types.UPDATE_CODE_EDITOR,
        value: value,
        name: name
    };
}

// Update the command source field
// TODO: is this redundant with UpdateCodeEditor
export function updateCommand(command){
  return {
    type: types.UPDATE_COMMAND,
    command: command
  }
}

// Append a new example field to the current command editor data
export function addExample() {
    return {
        type: types.ADD_COMMAND_EXAMPLE,
    };
}

// Delete a command example by its id (position in example list)
export function deleteCommandExample(id) {
    return {
        type: types.DELETE_COMMAND_EXAMPLE,
        id,
    };
}

// Update a command example by its id
export function updateCommandExample(id, text) {
    return {
        type: types.UPDATE_COMMAND_EXAMPLE,
        id,
        text,
    };
}

// Append a new argument field to the current command editor data
export function addCommandArg() {
    return {
        type: types.ADD_COMMAND_ARG,
    };
}

// Update a command argument by its id (position in list of argument)
// TODO: make contents of values more explicit
export function updateCommandArg(id, values) {
    return {
        type: types.UPDATE_COMMAND_ARG,
        id,
        values:values
    };
}

// Delete a command argument by its id
export function deleteCommandArg(id) {
    return {
        type: types.DELETE_COMMAND_ARG,
        id,
    };
}

// Clear the command edit pane
export function resetCommand() {
    return {
        type: types.RESET_COMMAND,
    };
}

// -----------------------------------------------

// The currentInput reducer keeps track of the user input on the main conversational pane

// Save a new value to the current user input
export function storeCurrentInput(input) {
    return {
        type: types.STORE_CURRENT_INPUT,
        currentInput: input
    };
}

export function storeClassIndex(id) {
    return {
        type: types.STORE_CLASS_INDEX,
        class_index: id
    };
}

export function clearClassIndex(id) {
    return {
        type: types.CLEAR_CLASS_INDEX,
    };
}

// -----------------------------------------------

// The minimizeState reducer governs which panes are displayed in the GUI

// Set visibility of docs window
// TODO: pull out .docs to make explicit, also rename (it is a bool )
export function setDocs(message) {
    return {
        type: types.SET_DOCS,
        ...message
    };
}

// Set visibility of command editor window
// TODO: pull out .code_edit to make explicit, also rename (it is a bool value)
export function setCodeEdit(message) {
    return {
        type: types.SET_CODE_EDIT,
        ...message
    };
}

// -----------------------------------------------

// The docs reducer governs state for the documentation display window

// Update the docs window with new text
// TODO: pull out .doc to make explicit, and possible destructure that object as well
export function updateDocEvent(message) {
    return {
        type: types.UPDATE_DOCS,
        ...message
    };
}

// -----------------------------------------------

// The functionSearch reducer governs state for the function search component

// Update the query given changes in user input text
// TODO: rename and pull out .search to make explicit
export function updateFunc(message) {
    return {
        type: types.UPDATE_FUNC,
        ...message
    };
}

// Update the search box with a list of results
// TODO: pull out .results to make explicit
export function updateResults(message) {
    return {
        type: types.UPDATE_RESULTS,
        results: message
    };
}

// -----------------------------------------------

// The inputHistory reducer governs state for the up-arrow, down-arrow command history log

// Add a new message/command to the inputHistory
export function addInputHistory(message) {
    return {
        type: types.ADD_INPUT_HISTORY,
        ...message
    };
}
// Move the input history in one direction or another (repopulating query box)
// TODO: message contains .direction, make this explicit
export function moveInputHistory(message) {
    return {
        type: types.MOVE_INPUT_HISTORY,
        ...message
    };
}

// -----------------------------------------------

// the predictions reducer governs the hints that appear above the main user input

// update with new set of hints
export function updatePredictions(predictions) {
    return {
        type: types.UPDATE_PREDICTIONS,
        predictions: predictions
    };
}

// -----------------------------------------------

// the variables reducer governs the variables that appear right sidebar

// update with new set of hints
export function updateVariables(variables) {
    return {
        type: types.UPDATE_VARIABLES,
        variables: variables
    };
}

export function toggleVariableAttributes(index) {
    return {
        type: types.TOGGLE_VARIABLE_ATTRIBUTES,
        index: index
    };
}
