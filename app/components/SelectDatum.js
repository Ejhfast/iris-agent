import React, { PropTypes } from 'react';
import OptionData from './OptionData';

const SelectDatum = ({ v, i }) =>
    <li>
      <span className="item name">{ v[0] }<input type="hidden" name={'name_' + i} value={ v[0] }></input></span>
      <span className="item type">
          <select name={'type_' + i}>
              <OptionData value="number" input={v[1][0]} />
              <OptionData value="categorical" input={v[1][0]} />
              <OptionData value="text" input={v[1][0]} />
          </select>
      </span>
      <span className="item example">{ v[1][1] }</span>
      <span className="item x-value"><input type="checkbox" name={'x_value_' + i}></input></span>
      <span className="item y-value"><input type="checkbox" name={'y_value_' + i}></input></span>
    </li>;

SelectDatum.propTypes = {
    v: PropTypes.any,
    i: PropTypes.number
};

export default SelectDatum;
