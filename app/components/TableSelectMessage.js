import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as proptypes from '../proptypes/types';
import { updateHint } from '../api_calls/python.js';
import { input } from '../containers/InputBox';
import { storeCurrentInput } from '../actions/index.js';

// this function updates the main conversation input (input) with a column selection
const setInput = (dispatch, active, text, onlyOne = false) => {
    return () => {
        // if component is not active, this will do nothing
        if(active === true){
          let stripText = text.replace(/{/g, '').replace(/}/g, '');
          // if this is a selectOne component, the job is easy
          if(onlyOne === true){
            input.value = text;
          }
          // otherwise, if input already includes text, we are going to remove/deselect it
          else if(input.value.includes(text)){
            let items = input.value.split(",").map(x => x.replace(/^\s+|\s+$/g, ''));
            let findIndex = items.indexOf(text);
            if(findIndex > -1){
               items.splice(findIndex, 1)
            }
            input.value = items.join(", ");// input.value.replace(RegExp(test+",|"test), '');
          }
          // otherwise, we are going to append it
          else{
            if(input.value !== "") input.value = input.value + ", " + stripText;
            else input.value = stripText;
          }
          dispatch(storeCurrentInput(input.value));
          updateHint(input.value);
        }
    };
};

// this component defines tables that have allow users to dynamically select columns
// TODO: this shares a lot with CollectionMessage, factor out as much as possible. Also, rename
class TableSelectMessage extends Component {
  render = () => {
    const data = JSON.parse(this.props.text);
    this.testColumns = data["column_data"];
    this.colMap = {};
    for(let i = 0; i < this.testColumns.length; i++){
      this.colMap[i] = this.testColumns[i].name;
    }
    this.testRows = data["row_data"].slice(0,3);
    let containsText = false;
    let singleColumn = this.testColumns.length === 1;
    console.log(this.props.currentInput);
    return (<div className = {this.props.origin === 'iris' ? 'message left' : 'message right'} style={this.props.hidden === true ? {display: 'none'} : {}}>
        <div className="bubble table">
        <div className="data_table" style={{width: this.testColumns.length * (350+10+1)}}>
          <div className="header">
          {this.testColumns.map((column,i) => {
            let newColStyle = {};
            if(column.type === "Text"){
              newColStyle['width'] = 350;
              containsText = true;
            }
            if (singleColumn || i == 0){ newColStyle['border-left'] = 'none' };
            if (i < 50){
              return <span className="data_column" onClick={setInput(this.props.dispatch, this.props.active, column.name, this.props.onlyOne)} style={newColStyle}>{column.name}</span>;
            }
          })}
          </div>
          {this.testRows.map((row,i) => {
            let newRowStyle = {};
            if (containsText){ newRowStyle['height'] = '4em'};
            return (<div className="data_row" style={newRowStyle}>
              {this.testColumns.map((column, i) => {
                let newColStyle = {};
                if(column.type === "Text"){
                  newColStyle['width'] = 350;
                }
                if(containsText){
                  newColStyle['height'] = '4em';
                }
                if(this.props.active && this.props.currentInput.includes(this.colMap[i])){
                  newColStyle['background-color'] = '#eee';
                }
                if (singleColumn || i == 0){ newColStyle['border-left'] = 'none' };
                if (i < 50){
                  return <span className="data_column" style={newColStyle}>{row[column.name]}</span>;
                }
              })}
            </div>)
          })}
        </div>
        </div>
    </div>);
  }
}

const mapStateToProps = (state) => ({
    currentInput: state.currentInput.input
});

TableSelectMessage = connect(mapStateToProps)(TableSelectMessage);

export default TableSelectMessage;
