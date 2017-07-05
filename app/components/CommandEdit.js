import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import brace from 'brace';
import AceEditor from 'react-ace';
import ArgumentAnnotation from './ArgumentAnnotation';
import { ExamplesEditor, exampleValues } from './ExamplesEditor';
import { updateCodeEditor } from '../actions/index.js';
import { doSearch, updateHint, updateDocs, testFunction } from '../api_calls/python.js';
import SplitPane from 'react-split-pane';

import 'brace/mode/python';
import 'brace/theme/github';

// references to dom elements
let command_name, command_title, test_inputs, args_editor, command_editor, explanation_editor, code_preview;

// helper to compile function on backend
// TODO: change name of python API
const compileFunction = (args_obj) => {
  testFunction({
      name: command_name.value,
      title:command_title.value,
      args: args_obj,
      examples: exampleValues(),
      command:command_editor.editor.getValue(),
      explanation:explanation_editor.editor.getValue()
  });
};

// helper to map user input to state for the command edit attributes
const onChangeInput = (dispatch, name, i) => {
    dispatch(updateCodeEditor(name, i.value));
};

// similar to above, helper to map dom state for the ace elements
const onChange = (dispatch, name) =>
  (value) => {
    dispatch(updateCodeEditor(name, value));
  };

class CommandEdit extends Component {

    componentDidUpdate() {
        code_preview.editor.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false
        });
    }

    render = () =>
          <div className="command_edit">
            <div class="overflow">
            <div className="label">Command name:</div>
            <input type="text" placeholder="e.g., AddTwoNumbers" onChange={() => onChangeInput(this.props.dispatch, 'name', command_name)} ref={node => {command_name = node;}} value={this.props.name} />
            <div className="label">Command title:</div>
            <input type="text" placeholder="e.g., add {x} and {y}" onChange={() => onChangeInput(this.props.dispatch, 'title', command_title)} ref={node => {command_title = node;}} value={this.props.title}/>
            <ArgumentAnnotation />
            <ExamplesEditor />
            <div className="label">The python command:</div>
            <AceEditor
              mode="python"
              width="100%"
              height="300px"
              autoScrollEditorIntoView="true"
              maxLines={15}
              theme="github"
              onChange={onChange(this.props.dispatch, 'command')}
              value={this.props.command}
              name="command_editor"
              ref={node => {command_editor = node;}}

            />
            <div className="label">The explanation:</div>
            <AceEditor
              mode="python"
              width="100%"
              maxLines={15}
              autoScrollEditorIntoView="true"
              height="300px"
              theme="github"
              onChange={onChange(this.props.dispatch, 'explanation')}
              value={this.props.explanation}
              name="explanation_editor"
              ref={node => {explanation_editor = node;}}
            />
          </div>
          <button onClick={() =>  compileFunction(this.props.args)}>Compile Code</button>
          <div className="command_edit testpane overflow">
            <div className="label">Code preview:</div>
            <AceEditor
              mode="python"
              width="100%"
              maxLines={15}
              autoScrollEditorIntoView="true"
              height="300px"
              theme="github"
              name="code_preview"
              value={this.props.preview}
              contentEditable = {false}
              ref={node => {code_preview = node;}}
            />
            {this.props.error !== "" ? <div className="errorBox">{this.props.error}</div> : <div></div>}
          </div>
          </div>
}

// the command edit pane requires a lot of state
const mapStateToProps = (state) => ({
    title: state.commandEditPane.title,
    name: state.commandEditPane.name,
    args: state.commandEditPane.args,
    command: state.commandEditPane.command,
    explanation: state.commandEditPane.explanation,
    testInputs: state.commandEditPane.testInputs,
    preview: state.commandEditPane.preview,
    error: state.commandEditPane.error
});

CommandEdit = connect(mapStateToProps)(CommandEdit);

export default CommandEdit;
