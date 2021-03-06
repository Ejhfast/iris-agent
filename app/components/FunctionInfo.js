import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { updateCommandAPI } from '../api_calls/python.js';
import { setCodeEdit } from '../actions/index.js';


// function to load a command into the command edit pane, and open pane
// the button for this is in the docs pane, but maybe logic should be moved to CommandEdit?
const editCommand = (dispatch, id) => {
  updateCommandAPI(id);
  dispatch(setCodeEdit({code_edit:false}));
}

// this component defines what is displayed in the docs window
class FunctionInfo extends Component {

    render = () => {
      if (this.props.doc.title === ""){
        return <div className="func_info"><div className="func_title">Search for a command to see documentation</div></div>
      }
      else{
        return (<div className="func_info">
          <div className="func_title">{this.props.doc.title}</div>
          <div className="func_description">
            {this.props.doc.description.join(" ")}
          </div>
          <div className="examples">
            <div className="head">Examples:</div>
            {this.props.doc.examples.map(ex => <div className="example">{ex}</div>)}
          </div>
          <div className="func_code">
            <div className="head">Code:</div>
            <pre>
            <SyntaxHighlighter language = "python">
            {this.props.doc.source}
            </SyntaxHighlighter>
            </pre>
          </div>
          <button onClick={() => editCommand(this.props.dispatch, this.props.doc.id)}>Edit Command</button>
        </div>)
      }
    }
}

const mapStateToProps = (state) => ({
    doc: state.docs,
    minimizeState: state.minimizeState
});

FunctionInfo = connect(mapStateToProps)(FunctionInfo);

export default FunctionInfo;
