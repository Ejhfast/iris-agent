import React from 'react';
import VegaLite from 'react-vega-lite';

// this components renders vega-light schemas in the iris conversation window
const VegaMessage = ({ origin, spec, data }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'}>
        <VegaLite spec={spec} data={data} />
    </div>;

export default VegaMessage;
