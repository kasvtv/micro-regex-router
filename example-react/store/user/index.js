export const path = 'user';

export const constants = {
	login: 'USER:LOGIN',
	logout: 'USER:LOGOUT',
};

export const actions = {
	login: () => ({
		type: constants.login,
	}),
	logout: () => ({
		type: constants.logout,
	}),
};

const reducer = (state = false, { type, payload }) => (

	type === constants.login ? true :
	type === constants.logout ? false :

	state
);

export const selectLoggedIn = state => state[path];

export default reducer;