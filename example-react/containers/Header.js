import React from 'react';
import { connect } from 'react-redux';
import Link from 'store/location/utils/LinkComponent';

import { history } from 'store/location';
import { selectLoggedIn, actions as userActions } from 'store/user';

const randInt = max => Math.floor(Math.random() * max);

function Header({ isLoggedIn, login, logout }) {
	return (
		<div>
			<nav>
				<Link href='/'><p>To home</p></Link>
				<Link href='/admin'><p>To secret admin url</p></Link>
				<Link onClick={() => history.push(`/page/${randInt(1000)}`)}>
					<p>To a random page!</p>
				</Link>
			</nav>
			{
				isLoggedIn ? (
					<button type='button' onClick={logout}>
						Currently logged in. Click to log out.
					</button>
				) : (
					<button type='button' onClick={login}>
						Currently logged out. Click to log in.
					</button>
				)
			}
		</div>
	);
}

export default connect(
	state => ({
		isLoggedIn: selectLoggedIn(state),
	}),
	{
		login: userActions.login,
		logout: userActions.logout,
	}
)(Header);