import reducer, { constants, history, path } from '..';

const locationActionTypes = Object.values(constants);

// Allows seamlessly updating location from other reducers
const locationMiddleWare = store => next => action => {
	if (!locationActionTypes.includes(action.type)) {

		const locationState = store.getState()[path];
		const nextLocationState = reducer(locationState, action);

		if (nextLocationState !== locationState) {
			history.push(
				nextLocationState.pathname +
				nextLocationState.search +
				nextLocationState.hash,
				{ fromRedux: true }
			);
		}
	}

	next(action);
};
export default locationMiddleWare;