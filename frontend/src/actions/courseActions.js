import axios from 'axios';

const header_info = { 'Content-type': 'application/json' };

export function enrollInCourse(userData, courseID) {
	return async function enrollInCourseThunk(dispatch, getState) {
		userData.courses.push(courseID);
		await axios
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
}

export function createCourse(courseData, userData, history) {
	return async function createCourseThunk(dispatch, getState) {
		await axios
			.post('/class/create-course', courseData, header_info)
			.then((res) => {
				dispatch(enrollInCourse(userData, res.data.id));
				dispatch({
					type: 'ADD-COURSES',
					payload: res.data,
				});
				history.push('/');
			})
			.catch((err) => console.log(err));
	};
}
