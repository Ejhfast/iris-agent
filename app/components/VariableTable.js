import React from 'react';
import { connect } from 'react-redux';
import { toggleVariableAttributes } from '../actions/index.js';
import Attributes from './Attributes';


let VariableTable = ({dispatch, variables}) =>
  <div className="variableTable">
      { variables.length > 0 ? <div className="title">Current Variables</div> : <div></div>}
      <ul>
        { _.map(_.sortBy(variables, (v) => {
            return v.order;
        }),
          (x, i) => {
              const attributes = x.show === true ? <Attributes variable={x} /> : <div></div>;
              return (<div>
                  <li>
                    <span onClick={() => dispatch(toggleVariableAttributes(i))} className="three_quarter name">{ x.name }</span>
                    <span className="quarter">{ x.value }</span>
                  </li>
                  {attributes}
                </div>);
          })}
      </ul>
  </div>;

const mapStateToProps = (state) => ({
    variables: state.variables,
});

VariableTable = connect(mapStateToProps)(VariableTable);

export default VariableTable;
