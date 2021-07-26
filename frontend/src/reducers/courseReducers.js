import axios from 'axios';

const initialState = [];

export default function courseReducers(state = initialState, action) {
	switch (action.type) {
		case 'SET-COURSES':
			return action.payload;
		default:
			return state;
	}
}

// Thunk Function
export async function loadCourses(dispatch, getState) {
	const res = await axios.get('/class/get-courses');
    dispatch({type: 'SET-COURSES', payload: res.data.payload})
}
