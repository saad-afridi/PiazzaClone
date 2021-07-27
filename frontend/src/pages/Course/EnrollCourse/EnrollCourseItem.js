import React from 'react';

import { Grid, Typography, makeStyles, Button } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { enrollInCourse } from '../../../actions/courseActions';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.elevated[1],
		margin: '10px 0px',
		borderRadius: '15px',
		padding: '10px',
	},
}));

const EnrollCourseItem = ({ course }) => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const {user} = useSelector((state) => state.userState);

	const stateProps = { dispatch, user, course };

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
				<Typography noWrap color="default" variant="h5">
					{valueText}
				</Typography>
			</Grid>
		</Grid>
	);
};

const enroll = (e, stateProps) => {
	const { dispatch, user, course } = stateProps;
	dispatch(enrollInCourse(user, course['id']));
};

export default EnrollCourseItem;
