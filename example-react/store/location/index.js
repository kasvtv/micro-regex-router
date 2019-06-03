import { createBrowserHistory } from 'history';
import { constants as userConstants } from 'store/user';

const history = createBrowserHistory();

const initialState = {
	pathname: history.location.pathname,
	search: history.location.search,
	hash: history.location.hash,
};

export const path = 'location';

export const constants = {
	userNavigated: 'LOCATION:USER_NAVIGATED',
};

export const actions = {
	userNavigated: ({ pathname, search, hash }) => ({
		type: constants.userNavigated,
		payload: { pathname, search, hash },
	}),
};

const reducer = (state = initialState, { type, payload }) => (

	type === constants.userNavigated ? {
		...state,
		...payload,
	} :

	type === userConstants.login ? {
		...state,
		pathname: '/admin',
	} :

	type === userConstants.logout &&
	state.pathname.startsWith('/admin') ? {
		...state,
		pathname: '/',
	} :

	state
);

export const selectPathName = state => state[path].pathname;
export const selectSearchQuery = state => state[path].search;
export const selectHash = state => state[path].hash;

export { history };

window.browserHistory = history;

export default reducer;