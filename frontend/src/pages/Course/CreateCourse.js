import React from 'react';

import PageHeader from '../../components/utils/PageHeader';

import { Grid, TextField, Button, makeStyles } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { createCourse } from '../../actions/courseActions';


const useStyles = makeStyles((theme) => ({
	createForm: {
		backgroundColor: theme.palette.elevated[1],
		minWidth: '250px',
		padding: '5px 0px',
	},
}));

const CreateCourse = () => {

    const classes = useStyles();

	const [name, setName] = React.useState('');
	const [num, setNum] = React.useState('');
	const [estimate, setEstimate] = React.useState(50);
	const [term, setTerm] = React.useState('');

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.userState);

	const stateProps = { name, num, estimate, term, dispatch, user };

	return (
		<Grid item>
			<PageHeader label={'Create Course'} />
			<Grid
                className={classes.createForm}
				container
				direction="column"
				spacing={3}
				justifyContent="center"
				alignItems="center">
				<Grid item>
					<TextField
						variant="filled"
						label="Course Name"
						onChange={(e) => setName(e.target.value)}
						placeholder={'Intro. To Comp Sci.'}
					/>
				</Grid>
				<Grid item>
					<TextField
						variant="filled"
						label="Course Number"
						onChange={(e) => setNum(e.target.value)}
						placeholder={'CSC108H5'}
					/>
				</Grid>
				<Grid item>
					<TextField
						variant="filled"
						label="Term"
						onChange={(e) => setTerm(e.target.value)}
						placeholder={'FALL2021'}
					/>
				</Grid>
				<Grid item>
					<TextField
						variant="filled"
						type="number"
						label="Estimated Enrollment"
						value={estimate}
						onChange={(e) => setEstimate(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color="secondary"
						onClick={(e) => submitForm(e, stateProps)}>
						CREATE
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

const submitForm = (e, stateProps) => {
	const { name, num, estimate, term, dispatch, user } = stateProps;
	const courseData = {
		class_name: name,
		class_num: num,
		estimated_enroll: estimate,
		term,
	};
	dispatch(createCourse(courseData, user));
};

export default CreateCourse;
