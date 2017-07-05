import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import { hideConversation } from '../actions/index.js';
import { connect } from 'react-redux';

// this mess formats how arugment names appear in conversation titles
const formatArgs = (title, args) => {
    if(title === null || title === undefined) {
        return '';
    }
    const words = title.split(' ');
    const replaceArgs = _.map(words, (w) => {
        let wd;
        if(w[0] === '{' && w[w.length - 1] === '}' && w.substring(1, w.length - 1).toLowerCase() in args) {
            wd = <span className="iris_arg">{ ('' + args[w.substring(1, w.length - 1).toLowerCase()]).toUpperCase() }</span>;
        } else {
            wd = <span className="normal_text">{ w }</span>;
        }
        return wd;
    });
    return replaceArgs;
};

// this defines a conversation title component
let Title = ({ text, args, id, dispatch }) => {
    return (<div className="title" onClick={e => {
        e.preventDefault();
        dispatch(hideConversation(id));
    }}>{ formatArgs(text, args) }</div>);
};

Title = connect()(Title);

export default Title;
