import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
import * as proptypes from '../proptypes/types';

// Class to define speadsheet-like data for Iris
// Todo: some of these should be refactored, as it is repeated in TableSelectMessage
class CollectionMessage extends Component {

  render = () => {
    // parse out spreadsheet data passed to component
    // Todo: should this happen elsewhere? if not, rename prop?
    const data = JSON.parse(this.props.text);
    this.testColumns = data["column_data"];
    this.testRows = data["row_data"];
    // special display case for single column dataframe
    let singleColumn = this.testColumns.length === 1;
    // we want to track whether any column contains text, as this affects formatting
    let containsText = false;
    return (<div className = {this.props.origin === 'iris' ? 'message left' : 'message right'} style={this.props.hidden === true ? {display: 'none'} : {}}>
        <div className="bubble table">
        <div className="data_table" style={{width: this.testColumns.length * (350+10+1)}}>
          <div className="header">
          {this.testColumns.map((column,i) => {
            // define style attributes for the column programmatically, based on data-type
            let newColStyle = {};
            if(column.type === "Text"){
              newColStyle['width'] = 350;
              containsText = true;
            }
            if (singleColumn || i == 0){ newColStyle['border-left'] = 'none' };
            // not going to display more than 50 columns
            // TODO: make this nicer, at least refactor to a global constant
            if(i < 50){
              return <span className="data_column" style={newColStyle}>{column.name}</span>;
            }
          })}
          </div>
          {this.testRows.map(row => {
            let newRowStyle = {};
            if (containsText){ newRowStyle['height'] = '4em'};
            // TODO: this is almost identical to the mapping above. refactor?
            return (<div className="data_row" style={newRowStyle}>
              {this.testColumns.map((column, i) => {
                let newColStyle = {};
                if(column.type === "Text"){
                  newColStyle['width'] = 350;
                }
                if(containsText){
                  newColStyle['height'] = '4em';
                }
                if (singleColumn || i == 0){ newColStyle['border-left'] = 'none' };
                if(i < 50){
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

CollectionMessage.propTypes = proptypes.messageType;

export default CollectionMessage;
