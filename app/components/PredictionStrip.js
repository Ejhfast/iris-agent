import React, { PropTypes } from 'react';
import { input } from '../containers/InputBox';
import { updateHint } from '../api_calls/python.js';

import { connect } from 'react-redux';

// set main input text and update hint
const setInput = (text) => {
    return () => {
        let stripText = text.replace(/{/g, '').replace(/}/g, '');
        input.value = stripText;
        updateHint(stripText);
    };
};

// TODO: should logic that binds to tab-key press be here as well?

// defines component for prediction strip above main input text
let PredictionStrip = ({predictions}) =>
    <div className="prediction_strip">
      <div className="predictions">
        {predictions.map((obj,i) => <span onClick={setInput(obj.text)} className={"prediction " + obj.style}>{ obj.text }</span>)}
      </div>
    </div>;


const mapStateToProps = (state) => ({
    predictions: state.predictions
});

PredictionStrip = connect(mapStateToProps)(PredictionStrip);

export {PredictionStrip, setInput};
