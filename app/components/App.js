import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RightPane from './RightPane';
import CommandEdit from './CommandEdit';
import SplitPane from 'react-split-pane';
import { setCodeEdit } from '../actions/index.js';

// import { Link } from 'react-router';

let App = ({ children, minimizeState }) => {
  let sizeP;
  if (minimizeState.code_edit === true){
    sizeP = "0%";
  }
  else{
    sizeP = "50%";
  }
  return (<SplitPane className="window" split="vertical" primary="second" defaultSize="400" minSize="400">
    <SplitPane split="horizontal" primary="second" size={sizeP} allowResize={true}>
      { children }
      <CommandEdit />
    </SplitPane>
    <RightPane />
  </SplitPane>);
};


App.propTypes = {
    children: PropTypes.object
};

const mapStateToProps = (state) => ({
    minimizeState: state.minimizeState
});

App = connect(mapStateToProps)(App);

export default App;
