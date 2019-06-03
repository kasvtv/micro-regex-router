import {
	createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import location, { path as locationPath } from './location';
import user, { path as userPath } from './user';

import startNavigationListener from './location/utils/startNavigationListener';
import locationMiddleWare from './location/middleware';

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers;
}

const store = createStore(
	combineReducers({
		[locationPath]: location,
		[userPath]: user,
	}),
	composeEnhancers(applyMiddleware(thunk, locationMiddleWare))
);

startNavigationListener(store);

export default store;

window.store = store;