// Conversation reducer
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const HIDE_CONVERSATION = 'HIDE_CONVERSATION';

// Command edit reducer
export const UPDATE_CODE_EDITOR = 'UPDATE_CODE_EDITOR';
export const UPDATE_COMMAND = 'UPDATE_COMMAND';
export const ADD_COMMAND_EXAMPLE = 'ADD_COMMAND_EXAMPLE';
export const DELETE_COMMAND_EXAMPLE = 'DELETE_COMMAND_EXAMPLE';
export const UPDATE_COMMAND_EXAMPLE = 'UPDATE_COMMAND_EXAMPLE';
export const ADD_COMMAND_ARG = 'ADD_COMMAND_ARG';
export const UPDATE_COMMAND_ARG = 'UPDATE_COMMAND_ARG';
export const DELETE_COMMAND_ARG = 'DELETE_COMMAND_ARG';
export const RESET_COMMAND = 'RESET_COMMAND';

// currentInput reducer
export const STORE_CURRENT_INPUT = 'STORE_CURRENT_INPUT';
export const STORE_CLASS_INDEX = 'STORE_CLASS_INDEX';
export const CLEAR_CLASS_INDEX = 'CLEAR_CLASS_INDEX';

// minimizeState reducer
export const SET_DOCS = 'SET_DOCS';
export const SET_CODE_EDIT = 'SET_CODE_EDIT';

// docs reducer
export const UPDATE_DOCS = 'UPDATE_DOCS';

// functionSearch reducer
export const UPDATE_FUNC = 'UPDATE_FUNC';
export const UPDATE_RESULTS = 'UPDATE_RESULTS';

// inputHistory reducer
export const ADD_INPUT_HISTORY = 'ADD_INPUT_HISTORY';
export const MOVE_INPUT_HISTORY = 'MOVE_INPUT_HISTORY';

// predictions reducer
export const UPDATE_PREDICTIONS = 'UPDATE_PREDICTIONS';

// variables reducer
export const UPDATE_VARIABLES = 'UPDATE_VARIABLES';
export const TOGGLE_VARIABLE_ATTRIBUTES = 'TOGGLE_VARIABLE_ATTRIBUTES';

// type to toggle between waiting and not waiting
export const WAITING_TOGGLE = 'WAITING_TOGGLE';

// TODO: do these exist? I think the server deals with them?
// which means they don't have corresponding actions, should probably make this explicit
export const ADD_SERVER_MESSAGE = 'ADD_SERVER_MESSAGE';
export const UPDATE_HISTORY = 'UPDATE_HISTORY'; // convo history
