import React from 'react';
import { connect } from 'react-redux';
import * as proptypes from '../proptypes/types';
import { setDocs } from '../actions/index.js';
import { updateDocs } from '../api_calls/python.js';

// open docs view with relevant command
const clickMessage = (dispatch, text) => {
  dispatch(setDocs({docs:false}))
  updateDocs(text);
};

// this element defines a clickable message that opens the corresponding command in the docs view
// usually, this first message of a convo, name maybe should change though
let TitleMessage = ({ dispatch, origin, text, hidden, title }) =>
    <div className = {origin === 'iris' ? 'message left clickable' : 'message right clickable'} style={hidden === true ? {display: 'none'} : {}} onClick={() => clickMessage(dispatch, title)}>
        <div className = "bubble"> {text} </div>
    </div>;

const mapStateToProps = (state) => ({});

TitleMessage = connect(mapStateToProps)(TitleMessage);

export default TitleMessage;
