import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import * as _ from 'lodash';

// TODO: a bit confused why we need this function
const valueOrNull = (value) => {
    if (value !== undefined) {
        return value;
    }
    return null;
};

// given an action, push any new messages onto an existing set of messages
const appendMessages = (oldMessages, action) => {
    const newMessages = [];
    let currentMax = 0;
    if (oldMessages.length > 0) {
        console.log('map', _.map(oldMessages, function(m) { return m.id; }));
        currentMax = _.max(_.map(oldMessages, function(m) { return m.id; }));
    }
    for (const m of action.text) {
        currentMax++;
        let class_index = action.class_index !== undefined ? action.class_index : null;
        newMessages.push({'origin': action.origin, 'text': m, 'id': currentMax, 'class_index': class_index,
                          'state': valueOrNull(action.state), 'arg': valueOrNull(action.arg)});
    }
    return oldMessages.concat(newMessages);
};

// given an action, update a conversation with new messages
const appendMessagesConvo = (convo, action) => {
    const { messages } = convo;
    return { ...convo, messages: appendMessages(messages, action), args: action.arg_map };
};

const hello_message = {'origin': 'iris', 'text': 'hello', 'id': 0, 'class_index': null, 'state': null, 'arg': null};
const start_convo = { 'messages': [hello_message], 'title': null, 'hidden': false, 'id': 0, 'args': {} };

// reducer for conversations
// TODO: This definition state is pretty long, messy
// Also not clear what "args" represents in a conversation with multiple sub-convos
// Maybe it is only important to represent the convo title, if so maybe that should be refactored
const conversation = (state = {'history': [start_convo], 'currentConvo': { 'messages': [], 'title': null, 'hidden': false, 'id': 1, 'args': {} }, 'state': 'START'}, action) => {
    const { history, currentConvo } = state;
    let newConvo;
    switch (action.type) {
        case types.UPDATE_HISTORY:
            console.log(action.conversation.currentConvo);
            return { history: action.conversation.history, currentConvo: action.conversation.currentConvo, 'state': state.state };
        case types.ADD_MESSAGE:
            return { history, currentConvo: appendMessagesConvo(currentConvo, action), 'state': state.state };
        // this is a bit complex, maybe needs review for clarity
        case types.ADD_SERVER_MESSAGE:
            if (action.text.length === 0) {
                return state;
            }
            newConvo = appendMessagesConvo(currentConvo, action);
            if (action.state === 'START') {
                // hardcoding some logic here for syncing history with server on START
                // this allows some commands to overwrite history immediately
                let theId = action.history.length;
                newConvo = {...newConvo, title: action.label, id: theId };
                return { history: action.history.concat([newConvo]), 'currentConvo': { 'messages': [], 'title': null, 'hidden': false, 'id': newConvo.id + 1, 'args': {} }, state: 'START' };
            }
            return { history, currentConvo: newConvo, state: action.state };
        case types.HIDE_CONVERSATION:
            // this is super verbose just to update a specific convo index, better way?
            const newHistory = _.map(history, conv => {
                const out = {...conv};
                if (conv.id === action.id) {
                    out.hidden = !out.hidden;
                }
                return out;
            });
            // TODO: also wasteful to do a copy everytime, indendent of the index?
            newConvo = {...currentConvo};
            if (newConvo.id === action.id) {
                newConvo.hidden = !newConvo.hidden;
            }
            return { history: newHistory, currentConvo: newConvo, state: state.state};
        default:
            return state;
    }
};

// variables reducer, constrols variables in right sidebar
const variables = (state = [], action) => {
    switch (action.type) {
        case types.UPDATE_VARIABLES:
            console.log(action.variables);
            return _.map(_.sortBy(action.variables, (v) => { return v.order; }));
        case types.TOGGLE_VARIABLE_ATTRIBUTES:
            let newVariables = _.map(_.sortBy(state, (v) => { return v.order; })).concat([]);
            if (newVariables[action.index].show == true){
              newVariables[action.index].show = false;
            } else {
              newVariables[action.index].show = true;
            }
            return newVariables;
        default:
            return state;
    }
};

// predictions reducer, governs hints above input box
const predictions = (state = [], action) => {
    switch (action.type) {
        case types.UPDATE_PREDICTIONS:
            return action.predictions;
        default:
            return state;
    }
};

// docs reducer, governs what is displayed in docs pane
const docs = (state = {title: '', examples: [], description: [], source:''}, action) => {
    switch (action.type) {
        case types.UPDATE_DOCS:
            return action.doc;
        default:
            return state;
    }
};

// function search reducer, governs function search in the right sidebar
const functionSearch = (state = {search: '', results: []}, action) => {
  switch (action.type){
    case types.UPDATE_FUNC:
      return {...state, search: action.search};
    case types.UPDATE_RESULTS:
      return {...state, results: action.results};
    default:
      return state;
  }
};

// input reducer, manages current user input on main conversation pane
const currentInput = (state = {'input': '', 'classIndex': null}, action) => {
  switch (action.type){
    case types.STORE_CURRENT_INPUT:
      return {...state, 'input': action.currentInput};
    case types.STORE_CLASS_INDEX:
      return {...state, 'classIndex': action.class_index};
    case types.CLEAR_CLASS_INDEX:
      return {...state, 'classIndex': null};
    default:
      return state;
  }
};

// reducer that manages which pans are open and closed
// TODO: this is a bad API, make more consistent
const minimizeState = (state={'docs': true, 'code_edit':true}, action) => {
  switch (action.type){
    case types.SET_DOCS:
      return {...state, 'docs': action.docs};
    case types.SET_CODE_EDIT:
      return {...state, 'code_edit': action.code_edit};
    default:
      return state;
  }
};

// helper to create a new array/list with desired index removed
const removeIndex = (arr, i) => {
  let first_half = arr.concat([]).slice(0, i);
  let second_half = arr.concat([]).slice(i+1,arr.length);
  return first_half.concat(second_half);
}

const blankCommand = {name: '', title: '', args: [], examples: [], command: '', explanation: '', testInput: '', preview:'', error: ''};

// reducer to manage the command editing pane
const commandEditPane = (state={...blankCommand}, action) => {
  switch (action.type){
    case types.UPDATE_CODE_EDITOR:
      let new_state = {};
      new_state[action.name] = action.value;
      return {...state, ...new_state};
    case types.UPDATE_COMMAND:
      console.log({...state, ...action.command});
      return {...state, ...action.command};
    case types.ADD_COMMAND_ARG:
      return {...state, args: state.args.concat([{'arg_name': '', 'arg_type': '', 'arg_string': ''}])};
    case types.RESET_COMMAND:
      return {...state, ...blankCommand};
    case types.ADD_COMMAND_EXAMPLE:
      return {...state, examples: state.examples.concat([''])};
    case types.UPDATE_COMMAND_EXAMPLE:
      let newExamples = state.examples.concat([]);
      newExamples[action.id] = action.text;
      return {...state, examples: newExamples};
    case types.UPDATE_COMMAND_ARG:
      let newArgs = state.args.concat([]);
      newArgs[action.id] = action.values;
      return {...state, args: newArgs};
    case types.DELETE_COMMAND_ARG:
      return {...state, args: removeIndex(state.args, action.id)};
    case types.DELETE_COMMAND_EXAMPLE:
      return {...state, examples: removeIndex(state.examples, action.id)};
    default:
      return state;
  }
};

// reducer to manage the input history state, going through old commands with up/down arrow
const inputHistory = (state = {'history': [], 'currId': null, 'showHistory': false }, action) => {
    let newId;
    switch (action.type) {
        case types.ADD_INPUT_HISTORY:
            const newHistory = [...state.history, action.message];
            console.log("history", newHistory, state.currId, newHistory.length-1);
            return {...state, 'history': newHistory, 'currId': newHistory.length-1};
        case types.MOVE_INPUT_HISTORY:
            if (state.history.length === 0 || state.currId === null) {
                console.log("history", state.currId, newId);
                return state;
            }
            newId = state.currId;
            if (action.direction === 'up') {
                if (newId >= 1) {
                    newId -= 1;
                }
            } else {
                if (newId < (state.history.length - 1)) {
                    newId += 1;
                }
            }
            console.log("history", state.currId, newId);
            return {...state, 'currId': newId };
        default:
            return state;
    }
};

// combine all these reducers together
const rootReducer = combineReducers({
    conversation,
    variables,
    predictions,
    inputHistory,
    currentInput,
    docs,
    functionSearch,
    minimizeState,
    commandEditPane,
    routing
});

export default rootReducer;
