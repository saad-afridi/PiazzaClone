import axios from 'axios';

const header_info = { 'Content-type': 'application/json' };

export const addCourse = (userData, courseID) => (dispatch) => {
    // update backend and then dispatch USER-CHANGE
	axios.post('/join-course:{courseID}');
};
