import axios from 'axios';

const header_info = { 'Content-type': 'application/json' };

export const addCourse = (courseID) => (dispatch) => {
	axios.post('/join-course:{courseID}');
};
