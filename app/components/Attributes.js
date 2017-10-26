import React from 'react';

const Attributes = ({variable}) =>
  <div className="attributes">
    {variable.attributes.components.map((x) => {return <li>{x}</li>;})}
    <li className="value">{variable.attributes.value}</li>
  </div>;

export default Attributes;
