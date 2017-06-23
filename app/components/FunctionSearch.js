import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { updateFunc, updateResults, storeCurrentInput, setDocs } from '../actions/index.js';
import { doSearch, updateHint, updateDocs } from '../api_calls/python.js';
import { input } from '../containers/InputBox';

let search_input;

const onChangeInput = (dispatch) => {
  console.log(search_input.value);
  if (search_input.value !== ""){
    dispatch(updateFunc({search: search_input.value}));
    doSearch(search_input.value);
  }
  else{
    dispatch({'type': 'UPDATE_RESULTS', 'results': []});
  }
};

const onClick = (dispatch, func_text) => {
  console.log("executing");
  // dispatch(storeCurrentInput(func_text));
  // updateHint(func_text);
  updateDocs(func_text);
  dispatch(setDocs({docs: false})); // open docs pane
  // input.value = func_text;
};

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
