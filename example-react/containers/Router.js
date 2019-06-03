import React from 'react';
import { connect } from 'react-redux';

import createRouter from '../../index.js';

import Page from 'components/Page';
import Admin from 'components/Admin';
import Home from 'components/Home';
import NotFound from 'components/NotFound';
import AccessDenied from 'components/AccessDenied';
import { selectPathName } from 'store/location';
import { selectLoggedIn } from 'store/user';

const protect = route => ({
	...route,
	middleware: (data, { loggedIn }) => loggedIn ? data : { component: AccessDenied },
});

const router = createRouter([
	protect({ pattern: '^/admin/?$', component: Admin }),
	{ pattern: '^/page/(?<param>.*)/?$', component: Page },
	{ pattern: '^/$', component: Home },
	{ pattern: '', component: NotFound },
]);

function Router({ pathname, loggedIn }) {
	const { component: Component, ...params } = router(pathname, { loggedIn });
	return <Component params={params} />;
}

export default connect(
	state => ({
		pathname: selectPathName(state),
		loggedIn: selectLoggedIn(state),
	})
)(Router);