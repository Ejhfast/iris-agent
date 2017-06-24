import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import brace from 'brace';
import AceEditor from 'react-ace';
import ArgumentAnnotation from './ArgumentAnnotation';
import { ExamplesEditor, exampleValues } from './ExamplesEditor';
import { updateCodeEditor, addCommandArg } from '../actions/index.js';
import { doSearch, updateHint, updateDocs, testFunction } from '../api_calls/python.js';
import SplitPane from 'react-split-pane';

import 'brace/mode/python';
import 'brace/theme/github';


let command_name, command_title, test_inputs, args_editor, command_editor, explanation_editor, code_preview;

const argValues = () => _.map(examples_ref, (value, key) => value.value);

const runTest = (args_obj) => {
  console.log(command_name);
  console.log("running", command_name.value)
  console.log("running", command_title.value)
  testFunction({
      name: command_name.value,
      title:command_title.value,
      args: args_obj,
      examples: exampleValues(),
      command:command_editor.editor.getValue(),
      explanation:explanation_editor.editor.getValue()
  });
};

const onChangeInput = (dispatch, name, i) => {
    console.log(name, i);
    console.log(i.value);
    console.log("setting",name,i.value);
    dispatch(updateCodeEditor(name, i.value));
  };


const onChange = (dispatch, name) =>
  (value) => {
    console.log(value);
    console.log("setting",name,value);
    dispatch(updateCodeEditor(name, value));
  };

const addArgument = (dispatch) =>
  () => {
    dispatch(addCommandArg());
  };

class CommandEdit extends Component {

    componentDidUpdate() {
        console.log("setting values", this.props.command);
        // command_editor.editor.setValue(this.props.command);
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
            <div className="label">Arguments:</div>
            <div className="arguments">
              {this.props.args.map((arg,i) => <ArgumentAnnotation id={i} name={arg.arg_name} string={arg.arg_string} arg_t={arg.arg_type}/>)}
            </div>
            <button onClick={addArgument(this.props.dispatch)}>Add Argument</button>
            <div className="label">Examples</div>
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
          <button onClick={() => runTest(this.props.args)}>Compile Code</button>
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
