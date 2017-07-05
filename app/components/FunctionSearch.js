import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateFunc, updateResults, storeCurrentInput, setDocs } from '../actions/index.js';
import { doSearch, updateHint, updateDocs, updateCommandAPI } from '../api_calls/python.js';
import { input } from '../containers/InputBox';

// reference to input search dom element
let search_input;

// this governs state change in function search box, update state value and pass to backend to match with function
const onChangeInput = (dispatch) => {
  if (search_input.value !== ""){
    dispatch(updateFunc({search: search_input.value}));
    doSearch(search_input.value);
  }
  else{
    // if nothing in field, clear results
    dispatch(updateResults([]));
  }
};

// on click, we want to load the clicked upon function into the docs view
// TODO: as with the hints, may not be one-to-one mapping here if classifier is weird?
const onClick = (dispatch, func_text) => {
  updateDocs(func_text);
  dispatch(setDocs({docs: false})); // open docs pane
};

// component that defines function search field
class FunctionSearch extends Component {
    render = () =>
      <div className="func_search">
        <div className="search_box"><input type="text" placeholder="search iris commands" onChange={() => onChangeInput(this.props.dispatch)} ref={node => {search_input = node;}}></input></div>
        <div className="results">
          {this.props.results.map(func => <div className="result" onClick={() => onClick(this.props.dispatch, func)}>{func}</div>)}
        </div>
      </div>
}

const mapStateToProps = (state) => ({
    search: state.functionSearch.search,
    results: state.functionSearch.results
});

FunctionSearch = connect(mapStateToProps)(FunctionSearch);

export default FunctionSearch;
