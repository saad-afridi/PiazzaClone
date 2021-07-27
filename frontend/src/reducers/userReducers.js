const getLocalData = () => {
    const localUser = localStorage.getItem('userData');
    if (localUser) return JSON.parse(localUser);
	return {
		authenticated: false,
		user: {},
	};
};

const initialState = getLocalData();

export default function userReducers(state = initialState, action) {
    let newState;
	switch (action.type) {
		case 'USER-LOGIN':
            newState = { authenticated: true, user: action.payload };
            saveData(newState);
			return newState;
		case 'USER-REGISTER':
            newState = { authenticated: true, user: action.payload };
            saveData(newState);
			return newState;
		case 'USER-CHANGE':
            newState = { ...state, user: action.payload };
            saveData(newState);
			return newState;
        case 'USER-LOGOUT':
            newState = { authenticated: false, user: {}}
            saveData(newState);
            return newState;
		default:
			return state;
	}
}

const saveData = (data) => {
	localStorage.setItem('userData', JSON.stringify(data));
};
