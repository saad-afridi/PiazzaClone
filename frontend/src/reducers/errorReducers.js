const initialState = {
	email: '',
	password: '',
};

export default function errorReducers(state = initialState, action) {
	switch (action.type) {
		case 'EMAIL':
			return { password: '', email: action.payload };
		case 'PASSWORD':
			return { email: '', password: action.payload };
		default:
			return state;
	}
}
