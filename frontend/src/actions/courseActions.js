import axios from 'axios';

const header_info = { 'Content-type': 'application/json' };

export const enrollInCourse = (userData, courseID, history) => (dispatch) => {
	userData.courses.push(courseID);
	axios
		.put(`/update-user/?email=${userData.email}`, userData, header_info)
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: 'USER-CHANGE',
				payload: res.data,
			});
		})
		.catch((err) => console.log(err.response.data));
};

export const createCourse = (courseData, userData, history) => (dispatch) => {
	// Initializing other attributes for course to follow schema
	courseData = {
		...courseData,
		instructors: [userData.email],
		folders: ['general'],
		students: [],
		post_num: 0,
		posts: [],
	};

	axios
		.post('/class/create-course', courseData, header_info)
		.then((res) => {
            history.push('/course')
            dispatch(enrollInCourse(userData, res.data.id));
			dispatch({
				type: 'ADD-COURSES',
				payload: res.data,
			});
		})
		.catch((err) => console.log(err));
};
