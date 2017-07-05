import React from 'react';
import { connect } from 'react-redux';
import { addExample, deleteCommandExample, updateCommandExample } from '../actions/index.js';
import * as _ from 'lodash';

// reference to example dom objects, indexed on position
let examples_ref = {};

// map over example objects to get all their text values
// necessary for call to backend
const exampleValues = () => {
  return _.map(_.filter(examples_ref, (value, key) => value !== null), (value, key) => value.value);
}

// helper function to add new example
const addExampleButton = (dispatch) =>
  () => {
    dispatch(addExample());
  };

// helper function to delete example
const onClickDelete = (dispatch, id) =>
  () => {
    dispatch(deleteCommandExample(id));
  };

// helper function to update example, indexed on its position in list
const onChangeInput = (dispatch, id) =>
  () => {
    dispatch(updateCommandExample(id, examples_ref[id].value));
  };

// Manage all the examples in the command edit pane
let ExamplesEditor = ({ dispatch, examples }) =>
    <div>
      <div className="label">Examples</div>
      <div className="command_examples">
        {examples.map((example, id) => <div className="example"><input type="text" ref={node => {examples_ref[id] = node;}} onChange={onChangeInput(dispatch, id)} value={example} /><button onClick={onClickDelete(dispatch, id)}>Delete</button></div>)}
        <button onClick={addExampleButton(dispatch)}>Add Example</button>
      </div>
    </div>;

const mapStateToProps = (state) => ({
  examples: state.commandEditPane.examples,
});

ExamplesEditor = connect(mapStateToProps)(ExamplesEditor);

export {exampleValues, ExamplesEditor};
