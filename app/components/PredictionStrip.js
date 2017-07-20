import React, { PropTypes } from 'react';
import { input } from '../containers/InputBox';
import { updateHint } from '../api_calls/python.js';
import { storeClassIndex, clearClassIndex } from '../actions/index.js';
import { connect } from 'react-redux';

// set main input text and update hint
const setInput = (dispatch, text ,id) => {
    return () => {
        let stripText = text.replace(/{/g, '').replace(/}/g, '');
        input.value = stripText;
        updateHint(stripText);
        dispatch(storeClassIndex(id));
    };
};

// TODO: should logic that binds to tab-key press be here as well?

// defines component for prediction strip above main input text
let PredictionStrip = ({dispatch, predictions}) => {
  // TODO: optimize width
  const charLength = predictions.map((p) => p.text.length).reduce((x,y) => x + y, 0);
  return (<div className="prediction_strip">
        <div className="predictions" style={{width: (charLength * 8) + "px"}}>
          {predictions.map((obj,i) => <span onClick={setInput(dispatch, obj.text, obj.id)} className={"prediction " + obj.style}>{ obj.text }</span>)}
        </div>
      </div>);
};



const mapStateToProps = (state) => ({
    predictions: state.predictions
});

PredictionStrip = connect(mapStateToProps)(PredictionStrip);

export {PredictionStrip, setInput};
