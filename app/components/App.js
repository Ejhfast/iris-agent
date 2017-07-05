import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RightPane from './RightPane';
import CommandEdit from './CommandEdit';
import SplitPane from 'react-split-pane';
import { setCodeEdit } from '../actions/index.js';

// App defines the main application structure
// routes will be rendered as "children"
// TODO: only one route now, remove?
let App = ({ children, minimizeState }) => {
  let codeEditPaneSize;
  if (minimizeState.code_edit === true) { codeEditPaneSize = "0%"; }
  else { codeEditPaneSize = "50%"; }
  return (<SplitPane className="window" split="vertical" primary="second" defaultSize="400" minSize="400">
    <SplitPane split="horizontal" primary="second" size={codeEditPaneSize} allowResize={true}>
      { children }
      <CommandEdit />
    </SplitPane>
    <RightPane />
  </SplitPane>);
};

const mapStateToProps = (state) => ({
    minimizeState: state.minimizeState
});

App = connect(mapStateToProps)(App);

export default App;
