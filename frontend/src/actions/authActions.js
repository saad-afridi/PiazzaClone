import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const header_info = { 'Content-type': 'application/json' };

export const tryLogin = (userData, history) => (dispatch) => {
	axios
		.post('/login', userData, header_info)
		.then((res) => {
            history.push('/')
			return dispatch({
				type: 'USER-LOGIN',
				payload: res.data.payload,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const tryRegister = (userData, history) => (dispatch) => {
	axios
		.post('/register', userData, header_info)
		.then((res) => {
            history.push('/');
			return dispatch({
				type: 'USER-LOGIN',
				payload: res.data.payload,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
