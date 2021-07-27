import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Auth from './pages/Auth';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import EnrollCourse from './pages/Course/EnrollCourse';
import CreateCourse from './pages/Course/CreateCourse';
import ViewCourse from './pages/Course/ViewCourse';

import { useSelector } from 'react-redux';

const AppRouter = () => {
	const { authenticated } = useSelector((state) => state.userState);
	console.log(authenticated);

	return (
		<Switch>
			<Route exact path="/">
				<Auth />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/enroll">
				<EnrollCourse />
			</Route>
			<Route path="/create-course">
				<CreateCourse />
			</Route>
			<Route path="/course">
				<ViewCourse />
			</Route>
			<Route path="/register">
				<Register />
			</Route>
		</Switch>
	);
};

export default AppRouter;
