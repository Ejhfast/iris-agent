import React from 'react';
import VegaLite from 'react-vega-lite';

const VegaMessage = ({ origin, spec, data }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'}>
        <VegaLite spec={spec} data={data} />
    </div>;


export default VegaMessage;
