import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
import * as proptypes from '../proptypes/types';

class CollectionMessage extends Component {

  render = () => {
    const data = JSON.parse(this.props.text);
    this.testColumns = data["column_data"];
    this.testRows = data["row_data"];
    this.getRow = (i) => this.testRows[i];
    let containsText = false;
    let singleColumn = this.testColumns.length === 1;
    return (<div className = {this.props.origin === 'iris' ? 'message left' : 'message right'} style={this.props.hidden === true ? {display: 'none'} : {}}>
        <div className="bubble table">
        <div className="data_table" style={{width: this.testColumns.length * (350+10+1)}}>
          <div className="header">
          {this.testColumns.map((column,i) => {
            if(column.type === "Text"){
              containsText = true;
            }
            return <span className="data_column" style={singleColumn || i == 0 ? {'border-left': 'none'} : {}}>{column.name}</span>;
          })}
          </div>
          {this.testRows.map(row => {
            let newRowStyle = {};
            if (containsText){ newRowStyle['height'] = '4em'};
            return (<div className="data_row" style={newRowStyle}>
              {this.testColumns.map((column, i) => {
                let newColStyle = {};
                if(column.type === "Text"){
                  newColStyle['width'] = 350;
                  newColStyle['height'] = '4em';
                }
                if (singleColumn || i == 0){ newColStyle['border-left'] = 'none' };
                return <span className="data_column" style={newColStyle}>{row[column.name]}</span>;
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
