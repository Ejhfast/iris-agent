import React from 'react';
import * as proptypes from '../proptypes/types';



const Message = ({ origin, text, hidden, title }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'} style={hidden === true ? {display: 'none'} : {}}>
        <div className = "bubble"> {text} </div>
    </div>;

Message.propTypes = proptypes.messageType;

export default Message;
