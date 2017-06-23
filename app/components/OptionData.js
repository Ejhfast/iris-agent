import React, { PropTypes } from 'react';

const OptionData = ({value, input}) => {
    if ( value === input.toLowerCase() ) {
        return <option value={value} selected="selected">{value}</option>;
    }
    return <option value={value}>{value}</option>;
};

OptionData.propTypes = {
    value: PropTypes.string,
    input: PropTypes.string
};

export default OptionData;
