import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import { useSelector } from 'react-redux';

import EnrollCourseItem from './EnrollCourseItem';
import PageHeader from '../../../components/utils/PageHeader';

const EnrollCourse = () => {
	const courses = useSelector((state) => state.courseState);
	console.log(courses);

	return (
		<Grid item>
			<PageHeader label={'Enroll'}></PageHeader>
			<Grid container direction="column" spacing={2}>
				{courses.map((_course, _index) => {
					return <EnrollCourseItem course={_course} key={_index} />;
				})}
			</Grid>
		</Grid>
	);
};

export default EnrollCourse;
