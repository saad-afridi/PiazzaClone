import React from 'react';

import PageHeader from '../../components/utils/PageHeader';

import { Grid, makeStyles, Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.elevated[1],
		padding: '10px',
	},
}));

const ChooseCourse = () => {
	const classes = useStyles();
	const courses = useSelector((state) => state.courseState);
	const history = useHistory();
	console.log(courses);

	const handleClick = (course) => {
		history.push(`/course?id=${course.id}`);
	};

	return (
		<Grid container justifyContent="center" alignItems="center">
			<Grid item>
				<PageHeader label={'Choose Course'} />
				<Grid
					container
					direction="column"
					spacing={2}
					alignItems="center"
					className={classes.root}>
					{courses.map((_course, _index) => {
						return (
							<Grid item key={_index}>
								<Button
									variant="contained"
									color="primary"
									onClick={() => handleClick(_course)}>
									{_course.class_num +
										': ' +
										_course.class_name}
								</Button>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ChooseCourse;
