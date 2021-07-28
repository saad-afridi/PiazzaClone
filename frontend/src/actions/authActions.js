import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const header_info = { 'Content-type': 'application/json' };

export function tryLogin(userData, history) {
    return async function tryLoginThunk(dispatch, getState) {
        await axios
			.post('/login', userData, header_info)
			.then((res) => {
				dispatch({
					type: 'USER-LOGIN',
					payload: res.data,
				});
				history.push('/');
			})
			.catch((err) => {
				const error = err.response.data.detail[0];
				console.log(error);
				dispatch({
					type: error.loc[1].toUpperCase(),
					payload: error.msg,
				});
			});
    }
}


export function tryRegister(userData, history) {
	return async function tryRegisterThunk(dispatch, getState) {
		await axios
			.post('/register', userData, header_info)
			.then((res) => {
				dispatch({ type: 'USER-REGISTER', payload: res.data });
				const path =
					userData.category === 'instructor'
						? '/create-course'
						: '/enroll';
				history.push(path);
			})
			.catch((err) => {
				const error = err.response.data.detail[0];
				console.log(error);
				dispatch({
					type: error.loc[1].toUpperCase(),
					payload: error.msg,
				});
			});
	};
}

export const logout = () => {
	return {
		type: 'USER-LOGOUT',
		payload: null,
	};
};
