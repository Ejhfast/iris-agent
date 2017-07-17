import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addMessage, addInputHistory, moveInputHistory, storeCurrentInput, updateDocEvent, setDocs } from '../actions/index.js';
import { updateHint, updateDocs } from '../api_calls/python.js';
import * as _ from 'lodash';

// dom reference element for main user input box
let input;

// helper to check whether history id (tracker in list) is not null (why does this exist??)
const doesHistoryExist = (inputHistory) => inputHistory.currId !== null;
// get currently selected history element
const getCurrentHistory = (inputHistory) => inputHistory.history.slice()[inputHistory.currId];

// key binder to grab special keystrokes in main input field
const onKeyDown = (dispatch, inputHistory, e, predictions) => {
    const keyCode = e.keyCode || e.which;
    // tab autocomplete
    if (keyCode === 9){ // tab
      if(predictions.length > 0){
        let stripText = predictions[0].text.replace(/{/g, '').replace(/}/g, '');
        input.value = stripText;
        updateHint(input.value);
      }
      e.preventDefault();
    }
    if (keyCode === 38) { // up arrow
        dispatch(moveInputHistory({'direction': 'up'}));
        if (doesHistoryExist(inputHistory)) {
            input.value = getCurrentHistory(inputHistory);
        }
    } else if(keyCode === 40) { // down arrow
        dispatch(moveInputHistory({'direction': 'down'}));
        if (doesHistoryExist(inputHistory)) {
            input.value = getCurrentHistory(inputHistory);
        }
    }
};

// store input value, and update hint and docs
const onChangeInput = (dispatch) => {
    dispatch(storeCurrentInput(input.value));
    updateHint(input.value);
    updateDocs(input.value);
};

// this component defines main text input
let InputBox = ({ dispatch, inputHistory, predictions }) =>
    <div className="input_box">
        <form onSubmit={e => {
            e.preventDefault();
            dispatch(addMessage({'origin': 'user', 'text': [input.value] }));
            dispatch(addInputHistory({'message': input.value}));
            dispatch(storeCurrentInput(''));
            input.value = '';
        }}>
            <input onChange={() => onChangeInput(dispatch)} onKeyDown={(e) => onKeyDown(dispatch, inputHistory, e, predictions)} type="text" placeholder="your message here" ref={node => {input = node;}}></input>
        </form>
    </div>;

const mapStateToProps = (state) => ({
    inputHistory: state.inputHistory,
    predictions: state.predictions,
});

InputBox = connect(mapStateToProps)(InputBox);

export {InputBox, input};
