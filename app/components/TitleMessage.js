import React from 'react';
import { connect } from 'react-redux';
import * as proptypes from '../proptypes/types';
import { setDocs } from '../actions/index.js';
import { updateDocs } from '../api_calls/python.js';

const clickMessage = (dispatch, text) => {
  dispatch(setDocs({docs:false}))
  updateDocs(text);
};

let TitleMessage = ({ dispatch, origin, text, hidden, title }) =>
    <div className = {origin === 'iris' ? 'message left clickable' : 'message right clickable'} style={hidden === true ? {display: 'none'} : {}} onClick={() => clickMessage(dispatch, title)}>
        <div className = "bubble"> {text} </div>
    </div>;

const mapStateToProps = (state) => ({
});

TitleMessage = connect(mapStateToProps)(TitleMessage);

export default TitleMessage;
