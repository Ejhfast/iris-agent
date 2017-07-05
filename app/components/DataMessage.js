import React from 'react';
import * as proptypes from '../proptypes/types';

// For displaying inline data
// TODO: "text" attribute is a bit misleading
const DataMessage = ({ origin, text, hidden }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'} style={hidden === true ? {display: 'none'} : {}}>
        <div className = "bubble data"><pre>{text}</pre></div>
    </div>;

DataMessage.propTypes = proptypes.messageType;

export default DataMessage;
