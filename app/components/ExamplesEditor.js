import React from 'react';
import { connect } from 'react-redux';
import { addExample, deleteCommandExample, updateCommandExample } from '../actions/index.js';
import * as _ from 'lodash';

let examples_ref = {};

const exampleValues = () => {
  console.log(examples_ref);
  return _.map(_.filter(examples_ref, (value, key) => value !== null), (value, key) => value.value);
}

const addExampleButton = (dispatch) =>
  () => {
    dispatch(addExample());
  };

const onClickDelete = (dispatch, id) =>
  () => {
    dispatch(deleteCommandExample(id));
  };

const onChangeInput = (dispatch, id) =>
  () => {
    console.log(examples_ref);
    console.log(examples_ref[id]);
    dispatch(updateCommandExample(id, examples_ref[id].value));
  };

let ExamplesEditor = ({ dispatch, examples }) =>
    <div className="command_examples">
        {examples.map((example, id) => <div className="example"><input type="text" ref={node => {examples_ref[id] = node;}} onChange={onChangeInput(dispatch, id)} value={example} /><button onClick={onClickDelete(dispatch, id)}>Delete</button></div>)}
        <button onClick={addExampleButton(dispatch)}>Add Example</button>
    </div>;

const mapStateToProps = (state) => ({
  examples: state.commandEditPane.examples,
});

ExamplesEditor = connect(mapStateToProps)(ExamplesEditor);

export {exampleValues, ExamplesEditor};
