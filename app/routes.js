import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Interact from './components/Interact';
import Upload from './components/Upload';
import SelectData from './components/SelectData';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Interact} />
		<Route path="/upload" component={Upload} />
		<Route path="/select_data" component={SelectData} />
	</Route>
);
