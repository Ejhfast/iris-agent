import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import ConversationPane from './containers/ConversationPane';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={ConversationPane} />
	</Route>
);
