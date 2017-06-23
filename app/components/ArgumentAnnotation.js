import React from 'react';
import { connect } from 'react-redux';
import { updateCommandArg, deleteCommandArg } from '../actions/index.js';


let arg_name = {}, arg_type = {}, arg_string = {};

const onChangeInput = (dispatch, id) => {
  console.log("change "+id);
  const new_values = {
    arg_name: arg_name[id].value,
    arg_type: arg_type[id].value,
    arg_string: arg_string[id].value
  };
  dispatch(updateCommandArg(id, new_values));
};

const onClickDelete = (dispatch, id) => {
  console.log("delete "+id);
  dispatch(deleteCommandArg(id));
};

let ArgumentAnnotation = ({ dispatch, id, name, string, arg_t }) =>
    <div className="arg_annotation">
        <input type="text" className="arg_name" placeholder="name of arg" onChange={() => onChangeInput(dispatch, id)} ref={node => {arg_name[id] = node;}} value={name}/>
        <select className="arg_type" value={arg_t} onChange={() => onChangeInput(dispatch, id)} ref={node => {arg_type[id] = node;}}>
          <option>Int</option>
          <option>String</option>
          <option>Array</option>
          <option>Float</option>
        </select>
        <input type="text" className="arg_string" placeholder="Message to request this argument from user..." onChange={() => onChangeInput(dispatch, id)} ref={node => {arg_string[id] = node;}} value={string}/>
        <button onClick={() => onClickDelete(dispatch, id)}>Delete</button>
    </div>;

const mapStateToProps = (state) => ({});

ArgumentAnnotation = connect(mapStateToProps)(ArgumentAnnotation);

export default ArgumentAnnotation;
