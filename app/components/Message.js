import React from 'react';
import * as proptypes from '../proptypes/types';

// this is the "default" / most common message type, just a normal chat bubble
const Message = ({ origin, text, hidden }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'} style={hidden === true ? {display: 'none'} : {}}>
        <div className = "bubble"> {text} </div>
    </div>;

export default Message;
