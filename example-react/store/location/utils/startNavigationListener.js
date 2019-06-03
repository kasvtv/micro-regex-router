import { actions, history } from '..';

export default function startNavigationListener(store) {
	history.listen(loc => {
		if (!loc.state || !loc.state.fromRedux) {
			store.dispatch(actions.userNavigated(loc));
		}
	});
}