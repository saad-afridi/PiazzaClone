import React from 'react';

import Auth from './pages/Auth';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import EnrollCourse from './pages/Course/EnrollCourse';
import CreateCourse from './pages/Course/CreateCourse';
import ChooseCourse from './pages/Course/ChooseCourse';
import ViewCourse from './pages/Course/ViewCourse';
import AddPost from './pages/Course/AddPost';

import { useSelector } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';

const AppRouter = () => {
	const { authenticated } = useSelector((state) => state.userState);
	console.log(authenticated);

	return (
		<Switch>
			<Route exact path="/">
				{authenticated ? (
					<Redirect from="/" to="/choose-course" />
				) : (
					<Auth />
				)}
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
			<Route path="/create-post">
				<AddPost />
			</Route>
			<Route path="/choose-course">
				<ChooseCourse />
			</Route>
			<Route path="/register">
				<Register />
			</Route>
            <Route path="/course">
                <ViewCourse />
            </Route>
		</Switch>
	);
};

export default AppRouter;
