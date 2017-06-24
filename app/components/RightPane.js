import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import FunctionSearch from './FunctionSearch';
import FunctionInfo from './FunctionInfo';
import SplitPane from 'react-split-pane';
import { setDocs, setCodeEdit, resetCommand } from '../actions/index.js';


const editCode = (dispatch, ms) => {
  dispatch(setCodeEdit({code_edit:!ms.code_edit}));
  dispatch(resetCommand());
}

let RightPane = ({ dispatch, variables, doc, minimizeState }) => {
  let sizeP;
  if (minimizeState.docs === true){
    sizeP = "100%";
  }
  else{
    sizeP = "30%";
  }
  return (<SplitPane split="horizontal" size="5%" allowResize={false}>
  <div>
    <img className="minButton" width="20px" src="http://0.0.0.0:8000/static/noun_974819.svg" onClick={() => dispatch(setDocs({docs:!minimizeState.docs}))}></img>
    <img className="settingsButton" width="26px" src="http://0.0.0.0:8000/static/noun_879834.svg"></img>
    <img className="newCodeButton" width="21px" src="http://0.0.0.0:8000/static/noun_993053.svg" onClick={() => editCode(dispatch, minimizeState)}></img>
  </div>
  <SplitPane split="horizontal" defaultSize={sizeP}>
    <div className="variableTable">
        <div className="title">Current Variables</div>
        <ul>
          { _.map(_.sortBy(variables, (v) => {
              return v.order;
          }),
            (x) => {
                return <li><span className="three_quarter name">{ x.name }</span><span className="quarter">{ x.value }</span></li>;
            })}
        </ul>
    </div>
    <SplitPane className="secondSplit" split="horizontal" defaultSize="50%" allowResize={true}>
      <FunctionSearch />
      <FunctionInfo />
    </SplitPane>
  </SplitPane>
  </SplitPane>);
};


RightPane.propTypes = {
    variables: PropTypes.arrayOf(PropTypes.any),
    doc: PropTypes.any,
    minimizeState: PropTypes.any
};

const mapStateToProps = (state) => ({
    variables: state.variables,
    doc: state.docs,
    minimizeState: state.minimizeState
});

RightPane = connect(mapStateToProps)(RightPane);

export default RightPane;
