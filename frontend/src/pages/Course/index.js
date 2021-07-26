import React, { useCallback } from 'react';

import axios from 'axios';

import { Grid } from '@material-ui/core';

import { useSelector, getState } from 'react-redux';

import { loadCourses } from '../../actions/courseActions';

const Course = () => {
	// Just an experiment to see whether I can grab courses from state
    
    // const dispatch = useDispatch()

    // const loadCourseData = useCallback(async () => {
    //         dispatch(loadCourses());
    //     },[dispatch])

	// React.useEffect(() => {
	// 	loadCourseData()

	// }, [loadCourseData]);

    const state = useSelector((state) => state);
    console.log(state);

    const courses = useSelector((state) => state.courseState);
	console.log('COURSES:', courses);

	return (
    <div>
        Hi this is some text! 
    </div>);
};

export default Course;
