[![NPM version](https://img.shields.io/npm/v/micro-regex-router.svg?style=flat)](https://www.npmjs.org/package/micro-regex-router)
[![Size](https://badgen.net/bundlephobia/minzip/micro-regex-router)](https://bundlephobia.com/result?p=micro-regex-router)
[![Build Status](https://travis-ci.com/kasvtv/micro-regex-router.svg?branch=master)](https://travis-ci.com/kasvtv/micro-regex-router)
[![Coverage Status](https://coveralls.io/repos/github/kasvtv/micro-regex-router/badge.svg?branch=master)](https://coveralls.io/github/kasvtv/micro-regex-router?branch=master)
[![Dependency Status](https://david-dm.org/kasvtv/micro-regex-router.svg)](https://david-dm.org/kasvtv/micro-regex-router)
[![Known Vulnerabilities](https://snyk.io/test/github/kasvtv/micro-regex-router/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kasvtv/micro-regex-router?targetFile=package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# micro-regex-router

Routing is one of those things you can make as complicated as you like. Or as simple as you like. This library (just a 30-line ES5 function), takes an array of routes (objects with a regex under the `"pattern"` key) and returns a router function. Pass a string into that function and it returns the matched route. Any named capture group in the regex will be returned, allowing you to use parameters.

Minimalistic, low-level, flexible and easy.

The only extra feature is using middleware on a route, allowing you to skip or overwrite the route according any condition you like *(See API)*.

## Installation

```bash
npm install micro-regex-router
```

## Usage example

Please refer to `example-react` to see a fully functioning react/redux project using this router with the `history` package. The Router component from this project is copied below:

```js
import React from 'react';
import { connect } from 'react-redux';

import createRouter from 'micro-regex-router';

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
```

# API

## The route type

A route is an object containing a `RegExp` or `string` under the key `"pattern"`, an optional function `"middleware"` that can take the return value and transform it and any other data associated with the route (these could be React components). Any parameters in the pattern should be assigned to named capture groups.

Example:

	{
		pattern: '/users/(?<id>[0-9]+)',
		component: UserPage
	}

## The middleware type

Middleware takes two arguments:
1. An Object containing anything what the route would normally return
2. An optional second argument containing the second argument passed to router

It returns:
* An Object overwriting the return value, or a Boolean, dictating if the route should be returned (else it is skipped).

Examples:

	// Authentication, taking an extra arg whether the user is logged in
	(params, { loggedIn }) => loggedIn ? true : AccessDeniedPage

	// Taking only odd id's
	(params) => params.id % 2 === 1

	// Mutating a parameter
	(params) => {...params, value: doSomething(params.value)}


## Default export: createRouter

### function ([route]) -> function router(path, extraArgs?) -> Object


Creates a router function based on the given routes.

This router function takes the path for which the correct route will be returned and an optional second argument that is passed to any middleware any of the matched route(s) may have. It returns all the parameters of the route, being a combination any keys on the route object that are not `pattern` or `middleware` and any named capture groups matched.

#### arguments
- **routes** *(Array< route >)*: The routes the router will create (in order of precedence).

#### returns
- **router** *function(`path` (string), `extraArgs`? (any))* -> *`result` (Object)*:
  - **path** *(string)*: The string to match.
  - **extraArgs** *(any)*: Any arguments to pass to the middleware, in case it is encountered.