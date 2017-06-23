import React from 'react';
import { input } from '../containers/InputBox';
import { updateHint } from '../api_calls/python.js';

let file_input;

const onChangeFile = (dispatch) => {
    input.value = file_input.files[0].path;
    updateHint(input.value);
    // updateDocs(input.value);
};

const FilePickMessage = ({ dispatch, active, origin, text, hidden }) =>{
  console.log(active);
  const readonly = active === true ? {} : {'disabled':true};
  return (<div className = {origin === 'iris' ? 'message left' : 'message right'} style={hidden === true ? {display: 'none'} : {}}>
      <div className = "bubble">
      <input type='file' name="file" id="file" {...readonly} className="inputfile" onChange={() => onChangeFile(dispatch)} ref={node => {file_input = node;}}/>
      </div>
  </div>);
}


export default FilePickMessage;
