import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const header_info = { 'Content-type': 'application/json' };

export const tryLogin = (userData, history) => (dispatch) => {
	axios
		.post('/login', userData, header_info)
		.then((res) => {
			history.push('/');
			return dispatch({
				type: 'USER-LOGIN',
				payload: res.data,
			});
		})
		.catch((err) => {
			const error = err.response.data.detail[0];
			console.log(error);
			return dispatch({
				type: error.loc[1].toUpperCase(),
				payload: error.msg,
			});
		});
};

export const tryRegister = (userData, history) => (dispatch) => {
	axios
		.post('/register', userData, header_info)
		.then((res) => {
			if (userData.category === 'instructor') {
				history.push('/create-course');
			} else {
				history.push('/enroll');
			}
			return dispatch({
				type: 'USER-LOGIN',
				payload: res.data,
			});
		})
		.catch((err) => {
			const error = err.response.data.detail[0];
			console.log(error);
			return dispatch({
				type: error.loc[1].toUpperCase(),
				payload: error.msg,
			});
		});
};

export const logout = () => {
    return {
        type: 'USER-LOGOUT',
        payload: null
    }
}