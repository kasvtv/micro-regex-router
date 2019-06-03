import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from 'store';
import Header from 'containers/Header';
import Router from 'containers/Router';

render(
	<Provider store={store}>
		<Header />
		<Router />
	</Provider>,
	document.getElementById('reactAppRoot')
);