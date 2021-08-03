import React from 'react';

import PostView from './PostView';

import {
	AppBar,
	Button,
	Typography,
	Toolbar,
	ButtonGroup,
	makeStyles,
	Container,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import { useHistory, useLocation } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/authActions';

const useStyles = makeStyles((theme) => ({
	appBar: {
		color: '#FFFFFFCC',
		backgroundColor: '#2d3748',
	},
	buttonGroups: {
		marginLeft: 'auto',
		marginRight: '10px',
	},
	courseSelect: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	userType: {
		marginLeft: 'auto',
		marginRight: '20px',
	},
}));

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ViewCourse = () => {
	let query = useQuery();

	const classes = useStyles();
	const history = useHistory();

	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const { user } = state.userState;
	const courses = state.courseState;

	const course = courses.find((_course) => _course.id === query.get('id'));

	// Handlers
	const handleLogout = () => {
		dispatch(logout());
	};

	const handleEnroll = () => {
		history.push('/enroll');
	};

	const handleCreateCourse = () => {
		history.push('/create-course');
	};

	const handleAddNewPost = () => {
		history.push(`/create-post?id=${course.id}`);
	};

	return (
		<Container maxWidth="xl">
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6">PiazzaClone</Typography>
					<Typography
						variant="h6"
						color="primary"
						className={classes.courseSelect}>
						{course.class_num}
					</Typography>
					<Typography
						className={classes.userType}
						variant="h5"
						color="secondary">
						{user.category.toUpperCase()}
					</Typography>
					<Typography variant="h6"> {user.name} </Typography>
					<ButtonGroup
						color="primary"
						className={classes.buttonGroups}>
						<Button onClick={handleEnroll}>Enroll In Course</Button>
						<Button
							onClick={handleCreateCourse}
							disabled={user.category === 'student'}>
							Create Course
						</Button>
					</ButtonGroup>
					<Button
						style={{ backgroundColor: red[400] }}
						onClick={handleLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Button
				style={{ margin: '70px 10px -70px 0px' }}
				variant="contained"
				color="primary"
				onClick={handleAddNewPost}>
				ADD POST
			</Button>
			<PostView courseID={course.id} />
		</Container>
	);
};

export default ViewCourse;
