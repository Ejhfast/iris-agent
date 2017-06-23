import React from 'react';
import * as proptypes from '../proptypes/types';

const ExplainMessage = ({ origin, text, hidden }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'} style={hidden === true ? {display: 'none'} : {}}>
        <div className = "bubble explain"> {text} </div>
    </div>;

ExplainMessage.propTypes = proptypes.messageType;

export default ExplainMessage;
