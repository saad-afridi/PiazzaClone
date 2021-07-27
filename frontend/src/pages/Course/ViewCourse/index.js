import React from 'react';

import {
	AppBar,
	Button,
	Typography,
	Toolbar,
	ButtonGroup,
	makeStyles,
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
    buttonGroups : {
        marginLeft: 'auto',
        marginRight: '10px'
    }
}));

const ViewCourse = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.userState);

    // Handlers
	const handleLogout = () => {
		dispatch(logout());
	};

    const handleEnroll = () => {
        history.push('/enroll')
    }

    const handleCreateCourse = () => {
        history.push('/create-course')
    }

	return (
		<div>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6">PiazzaClone</Typography>
					<ButtonGroup color="primary" className={classes.buttonGroups}>
						<Button onClick={handleEnroll}>Enroll In Course</Button>
						<Button onClick={handleCreateCourse} disabled={user.category === "student"}>
							Create Course
						</Button>
					</ButtonGroup>
					<Button style={{backgroundColor: red[400]}} onClick={handleLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default ViewCourse;
