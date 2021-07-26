const getLocalData = () => {
    return { 
        authenticated: false, 
        user: {}
    }
}

const initialState=getLocalData();

export default function userReducers(state=initialState, action) {
    switch (action.type) {
		case 'USER-LOGIN':
			console.log('ACTION PAYLOAD', action.payload);
			return { authenticated: true, user: action.payload };
		case 'USER-REGISTER':
			console.log('ACTION PAYLOAD', action.payload);
			return { authenticated: true, user: action.payload };
        case 'USER-CHANGE':
            return { ...state, user: action.payload }

        default:
            return state;
	}
}