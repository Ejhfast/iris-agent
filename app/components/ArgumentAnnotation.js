import React from 'react';
import { connect } from 'react-redux';
import { updateCommandArg, deleteCommandArg, addCommandArg } from '../actions/index.js';

// References to arg components, indexed by id (position of arg in list)
let arg_name = {}, arg_type = {}, arg_string = {};

// Helper to update arg state using reference to components
const onChangeInput = (dispatch, id) => {
  const new_values = {
    arg_name: arg_name[id].value,
    arg_type: arg_type[id].value,
    arg_string: arg_string[id].value
  };
  dispatch(updateCommandArg(id, new_values));
};

// Helper to update arg state to delete arg by id
const onClickDelete = (dispatch, id) => {
  dispatch(deleteCommandArg(id));
};

// helper to add argument
// TODO: should this be refactored into a component that manages arguments?
const addArgument = (dispatch) =>
  () => {
    dispatch(addCommandArg());
  };

// Function that defines the set of arguments
let ArgumentAnnotation = ({ dispatch, args }) =>
    <div>
      <div className="label">Arguments:</div>
      <div className="arguments">
        {args.map((arg,i) => {
          const name = arg.arg_name;
          const string = arg.arg_string;
          const arg_t = arg.arg_type;
          return (<div className="arg_annotation">
              <input type="text" className="arg_name" placeholder="name of arg" onChange={() => onChangeInput(dispatch, i)} ref={node => {arg_name[i] = node;}} value={name}/>
              <select className="arg_type" value={arg_t} onChange={() => onChangeInput(dispatch, i)} ref={node => {arg_type[i] = node;}}>
                <option>Int</option>
                <option>String</option>
                <option>Array</option>
                <option>Float</option>
                <option>Any</option>
                <option>Dataframe</option>
                <option>DataframeSelector</option>
              </select>
              <input type="text" className="arg_string" placeholder="Message to request this argument from user..." onChange={() => onChangeInput(dispatch, i)} ref={node => {arg_string[i] = node;}} value={string}/>
              <button onClick={() => onClickDelete(dispatch, i)}>Delete</button>
          </div>);
        })}
      </div>
      <button onClick={addArgument(dispatch)}>Add Argument</button>
    </div>;

const mapStateToProps = (state) => ({
  args: state.commandEditPane.args,
});

ArgumentAnnotation = connect(mapStateToProps)(ArgumentAnnotation);

export default ArgumentAnnotation;
