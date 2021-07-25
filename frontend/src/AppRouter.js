import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Auth from './pages/Auth';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import { useSelector } from 'react-redux';

const AppRouter = () => {
	const { authenticated } = useSelector((state) => state.authState);
    console.log(authenticated);

	return (
		<Switch>
			<Route exact path="/">
				<Auth />
			</Route>
			<Route path="/login">
				<Login />{' '}
			</Route>
			<Route path="/register">
				<Register />
			</Route>
		</Switch>
	);
};

export default AppRouter;
