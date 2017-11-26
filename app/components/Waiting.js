//this file contains relavent react to enables
//waiting indicator
//waiting indicator = https://thumbs.gfycat.com/GrippingReflectingBasenji-max-1mb.gif


import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

//code dealing with gif images
//https://thumbs.gfycat.com/GrippingReflectingBasenji-max-1mb.gif

// this is the "default" / most common message type, just a normal chat bubble
let Waiting = ({ waiting }) => {
  if ( waiting === true ){
    return (<div className='message left'>
        <div className = "bubble"><img className="frame" src="https://media.giphy.com/media/12yixaK3jASpb2/giphy.gif" /></div>
    </div>);
  }
  return null;
}

const mapStateToProps = (state) => ({
    waiting: state.waitIndicator.indicator
});

Waiting = connect(mapStateToProps)(Waiting);

export default Waiting;
