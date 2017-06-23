import React from 'react';
import VegaLite from 'react-vega-lite';

const spec = {
  "description": "A simple bar chart with embedded data.",
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"}
  }
};

const barData = {
  "values": [
    {"a": "A","b": 20}, {"a": "B","b": 34}, {"a": "C","b": 55},
    {"a": "D","b": 19}, {"a": "E","b": 40}, {"a": "F","b": 34},
    {"a": "G","b": 91}, {"a": "H","b": 78}, {"a": "I","b": 25}
  ]
};
import * as proptypes from '../proptypes/types';

const VisualMessage = ({ origin, content }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'}>
        <img width="500px" alt="Embedded Image" src={'data:image/png;base64,' + content} />
        <VegaLite spec={spec} data={barData} />
    </div>;

VisualMessage.propTypes = proptypes.visualMessageType;

export default VisualMessage;
