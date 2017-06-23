import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SelectDatum from './SelectDatum';


let SelectData = ({ data }) =>
    <form action="http://localhost:8000/import_data" method="post">
        <ul>
            <li className="title">
                <span className="item">Feature Name</span>
                <span className="item">Type</span>
                <span className="item">Example Value</span>
                <span className="item">X-Value</span>
                <span className="item">Y-Value</span>
            </li>
            { data.map((value, i) => <SelectDatum key={i} v={value} i={i} />) }
        </ul>
        <div className="clear"></div>
        <br />
        <input type="submit" value="Import data"></input>
    </form>;

const mapStateToProps = (state, ownProps) => ({
    data: JSON.parse(ownProps.location.query.data)
});

SelectData.propTypes = { data: PropTypes.any };

SelectData = connect(mapStateToProps)(SelectData);

export default SelectData;
