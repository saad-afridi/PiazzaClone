import React from 'react';

import PostView from './PostView';

import {
	AppBar,
	Button,
	Typography,
	Toolbar,
	ButtonGroup,
	makeStyles,
	FormControl,
	Select,
	MenuItem,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import { useHistory } from 'react-router';

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
		marginLeft: '20px',
		marginRight: 'auto',
	},
	userType: {
		marginRight: '20px',
	},
}));

const selectCourse = (course, key) => {
	return (
		<MenuItem value={course} key={key}>
			{course.toUpperCase()}
		</MenuItem>
	);
};

const ViewCourse = () => {
	const classes = useStyles();
	const history = useHistory();

	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const { user } = state.userState;
	const courses = state.courseState;

	// makes a num to course dict so {CSC108: Course id ...}
	let tmpCourseOpts = [];
	const courseNumToCourseID = courses.reduce((groupedCourse, course) => {
		if (user.courses.includes(course.id)) {
			groupedCourse[course.class_num] = course.id;
			tmpCourseOpts.push(course.class_num);
		}
		return groupedCourse;
	}, {});

	const [courseOption, setCourseOption] = React.useState(tmpCourseOpts[0]);

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
	console.log(courseOption, tmpCourseOpts[0], courseNumToCourseID);

	return (
		<div>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6">PiazzaClone</Typography>
					<FormControl className={classes.courseSelect}>
						<Select
							value={courseOption}
							onChange={(e) => setCourseOption(e.target.value)}>
							{tmpCourseOpts.map((_course, _index) => {
								return selectCourse(_course, _index);
							})}
						</Select>
					</FormControl>
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
			<PostView courseID={courseNumToCourseID[courseOption]} />
		</div>
	);
};

export default ViewCourse;
