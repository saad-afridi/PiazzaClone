import authReducers from './authReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	authState: authReducers,
});

export default rootReducer;
