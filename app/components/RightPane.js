import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import FunctionSearch from './FunctionSearch';
import FunctionInfo from './FunctionInfo';
import VariableTable from './VariableTable';
import SplitPane from 'react-split-pane';
import { setDocs, setCodeEdit, resetCommand } from '../actions/index.js';

// open emmpty command editor window
// TODO: should this be here, or in command editing file?
const editCode = (dispatch, ms) => {
  dispatch(setCodeEdit({code_edit:!ms.code_edit}));
  dispatch(resetCommand());
}

// this component defines the right sidebar view
// TODO: many aspects of this are messy, refactor out navbar and variable table at minimum
let RightPane = ({ dispatch, variables, doc, minimizeState }) => {
  let variablePaneSize;
  if (minimizeState.docs === true){ variablePaneSize = "100%"; }
  else { variablePaneSize = "30%"; }
  return (<SplitPane split="horizontal" defaultSize="40px" allowResize={false}>
  <div>
    <img className="minButton" width="20px" src="http://0.0.0.0:8000/static/noun_974819.svg" onClick={() => dispatch(setDocs({docs:!minimizeState.docs}))}></img>
    <img className="settingsButton" width="26px" src="http://0.0.0.0:8000/static/noun_879834.svg"></img>
    <img className="newCodeButton" width="21px" src="http://0.0.0.0:8000/static/noun_993053.svg" onClick={() => editCode(dispatch, minimizeState)}></img>
  </div>
  <SplitPane split="horizontal" defaultSize={variablePaneSize}>
    <VariableTable />
    <SplitPane className="secondSplit" split="horizontal" defaultSize="50%" allowResize={true}>
      <FunctionSearch />
      <FunctionInfo />
    </SplitPane>
  </SplitPane>
  </SplitPane>);
};

const mapStateToProps = (state) => ({
    variables: state.variables,
    doc: state.docs,
    minimizeState: state.minimizeState
});

RightPane = connect(mapStateToProps)(RightPane);

export default RightPane;
