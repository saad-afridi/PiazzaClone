import axios from 'axios';

const header_info = { 'Content-type': 'application/json' };

export const enrollInCourse = (userData, courseID) => (dispatch) => {
	// update backend and then dispatch USER-CHANGE
    console.log("USERDATA:", userData)
	userData.courses.push(courseID);

	axios
		.put(`/update-user/?email=${userData['email']}`, userData, header_info)
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: 'USER-CHANGE',
				payload: res.data,
			});
		})
		.catch((err) => console.log(err.response.data));
};
