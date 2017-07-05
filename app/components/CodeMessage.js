import React from 'react';
import * as proptypes from '../proptypes/types';
import SyntaxHighlighter from 'react-syntax-highlighter';

// Element to define an Iris code snippet message
// Todo: organize message components into subfolders?
const CodeMessage = ({ origin, text, hidden }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'} style={hidden === true ? {display: 'none'} : {}}>
        <div className = "bubble code"><pre><SyntaxHighlighter language = "python">{text}</SyntaxHighlighter></pre></div>
    </div>;

CodeMessage.propTypes = proptypes.messageType;

export default CodeMessage;
