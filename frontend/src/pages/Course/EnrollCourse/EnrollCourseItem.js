import React from 'react';

import { Grid, Typography, makeStyles, Button } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { enrollInCourse } from '../../../actions/courseActions';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.elevated[1],
		margin: '10px 0px',
		padding: '10px',
	},
}));

const EnrollCourseItem = ({ course }) => {
	const classes = useStyles();

	const [disabled, setDisabled] = React.useState(false);

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.userState);

	// Check if user is already enrolled in this course
    for (let i = 0; i < user.courses.length; i++) {
        if (user.courses[i].id === course.id) setDisabled(true);
    }

	const stateProps = { dispatch, user, course, setDisabled };

	return (
		<Grid item>
			<Grid
				container
				direction="column"
				spacing={2}
				className={classes.root}>
				<Grid item>
					<ObjToTextField
						keyText={'NAME'}
						valueText={course.class_name}
					/>
				</Grid>
				<Grid item>
					<ObjToTextField
						keyText={'NUM'}
						valueText={course.class_num}
					/>
				</Grid>
				<Grid item>
					<ObjToTextField
						keyText={'ESTIMATED ENROLLMENT'}
						valueText={course.estimated_enroll}
					/>
				</Grid>
				<Grid item>
					<ObjToTextField keyText={'TERM'} valueText={course.term} />
				</Grid>
				<Grid item>
					<Button
						style={{ left: '35%' }}
						disabled={disabled}
						variant="contained"
						color="secondary"
						onClick={(e) => enroll(e, stateProps)}>
						ENROLL
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

const ObjToTextField = ({ keyText, valueText }) => {
	return (
		<Grid container direction="row" spacing={2}>
			<Grid item>
				<Typography noWrap color="primary" variant="h6">
					{keyText + ':'}
				</Typography>
			</Grid>
			<Grid item>
				<Typography noWrap variant="h5">
					{valueText}
				</Typography>
			</Grid>
		</Grid>
	);
};

const enroll = (e, stateProps) => {
	const { dispatch, user, course, setDisabled } = stateProps;
    setDisabled(true);
	dispatch(enrollInCourse(user, course['id']));
};

export default EnrollCourseItem;
