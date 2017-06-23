import React, { PropTypes } from 'react';
import { input } from '../containers/InputBox';
import { updateHint } from '../api_calls/python.js';

import { connect } from 'react-redux';

const setInput = (text) => {
    return () => {
        let stripText = text.replace(/{/g, '').replace(/}/g, '');
        input.value = stripText;
        updateHint(stripText);
    };
};

let PredictionStrip = ({predictions}) =>
    <div className="prediction_strip">
      <div className="predictions">
        {predictions.map((obj,i) => <span onClick={setInput(obj.text)} className={"prediction " + obj.style}>{ obj.text }</span>)}
      </div>
    </div>;

PredictionStrip.propTypes = {
    predictions: PropTypes.any
};

const mapStateToProps = (state) => ({
    predictions: state.predictions
});

PredictionStrip = connect(mapStateToProps)(PredictionStrip);

export {PredictionStrip, setInput};
