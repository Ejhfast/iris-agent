import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addMessage, addInputHistory, moveInputHistory, storeCurrentInput, updateDocEvent, setDocs } from '../actions/index.js';
import { updateHint, updateDocs } from '../api_calls/python.js';

import * as _ from 'lodash';


let input;

const notNull = (inputHistory) => inputHistory.currId !== null;
const getCurrentHistory = (inputHistory) => _.reverse(inputHistory.history.slice())[inputHistory.currId];

const onKeyDown = (dispatch, inputHistory, e, predictions) => {
    const keyCode = e.keyCode || e.which;
    console.log(keyCode);
    if (keyCode === 9){ // tab
      if(predictions.length > 0){
        let stripText = predictions[0].text.replace(/{/g, '').replace(/}/g, '');
        input.value = stripText;
        updateHint(input.value);
      }
      e.preventDefault();
    }
    if (keyCode === 38) { // up arrow
        console.log('up arrow');
        dispatch(moveInputHistory({'direction': 'up'}));
        console.log(inputHistory);
        if (notNull(inputHistory)) {
            console.log('diplay', getCurrentHistory(inputHistory));
            input.value = getCurrentHistory(inputHistory);
        }
    } else if(keyCode === 40) { // down arrow
        console.log('down arrow');
        dispatch(moveInputHistory({'direction': 'down'}));
        console.log(inputHistory);
        if (notNull(inputHistory)) {
            console.log('display', getCurrentHistory(inputHistory));
            input.value = getCurrentHistory(inputHistory);
        }
    }
};
// canal artefact wood angle coffee february media aunt tail load weapon jazz
const onChangeInput = (dispatch) => {
    dispatch(storeCurrentInput(input.value));
    updateHint(input.value);
    updateDocs(input.value);
};

const lookup_func = (dispatch, minimizeState, currMessages) => {
  dispatch(setDocs({docs:!minimizeState.docs}))
  if (currMessages.length > 0){
    // console.log(currMessages);
    updateDocs(currMessages[0].text);
  }
  else{
    updateDocs(input.value);
  }
}

// input goes here
let InputBox = ({ dispatch, inputHistory, predictions }) =>
    <div className="input_box">
        <form onSubmit={e => {
            e.preventDefault();
            dispatch(addMessage({'origin': 'user', 'text': [input.value] }));
            dispatch(addInputHistory({'message': input.value}));
            dispatch(storeCurrentInput(''));
            // dispatch(updateDocEvent({'doc':{'title':''}}));
            input.value = '';
        }}>
            <input onChange={() => onChangeInput(dispatch)} onKeyDown={(e) => onKeyDown(dispatch, inputHistory, e, predictions)} type="text" placeholder="your message here" ref={node => {input = node;}}></input>
        </form>
    </div>;

InputBox.propTypes = {
    dispatch: PropTypes.func,
    inputHistory: PropTypes.any,
    predictions: PropTypes.any
};

const mapStateToProps = (state) => ({
    inputHistory: state.inputHistory,
    predictions: state.predictions,
});

InputBox = connect(mapStateToProps)(InputBox);

export {InputBox, input};
