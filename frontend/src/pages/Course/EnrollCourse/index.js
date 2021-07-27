import React from 'react';

import { Grid, Button } from '@material-ui/core';

import { useSelector } from 'react-redux';

import EnrollCourseItem from './EnrollCourseItem';
import PageHeader from '../../../components/utils/PageHeader';

import { useHistory } from 'react-router-dom';

const EnrollCourse = () => {
	const courses = useSelector((state) => state.courseState);
	const { user } = useSelector((state) => state.userState);
	const filteredCourses = courses.filter(
		(course) => !user.courses.includes(course.id)
	);
	const history = useHistory();

	return (
		<Grid container alignItems="center" justifyContent="center">
			<Grid item>
				<PageHeader label={'Enroll In Courses'}></PageHeader>
				<Grid container direction="column" spacing={2}>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={() => history.push('/')}>
							Home
						</Button>
					</Grid>
					{filteredCourses.map((_course, _index) => {
						return (
							<EnrollCourseItem course={_course} key={_index} />
						);
					})}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default EnrollCourse;
