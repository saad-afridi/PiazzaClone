import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const header_info = { 'Content-type': 'application/json' };

export const tryLogin = (userData) => (dispatch) => {
	console.log(userData);
	axios
		.post('/login', userData, header_info)
		.then((res) => {
			console.log(res);
            return dispatch({
                type: 'USER-LOGIN',
                payload: res.data
            })
		})
		.catch((err) => {
			console.log(err);
		});
};
