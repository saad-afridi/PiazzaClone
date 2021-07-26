import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './pages/Auth';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import EnrollCourse from './pages/Course/EnrollCourse'

import { useSelector } from 'react-redux';

const AppRouter = () => {
	const { authenticated } = useSelector((state) => state.userState);
    console.log(authenticated);

	return (
		<Switch>
            {authenticated ? '' : <Redirect from="/courses" to="/"/>}
			<Route exact path="/">
				<Auth />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
            <Route path="/enroll">
                <EnrollCourse />
            </Route>
			<Route path="/register">
				<Register />
			</Route>
		</Switch>
	);
};

export default AppRouter;
