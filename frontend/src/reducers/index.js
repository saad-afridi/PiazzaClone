import authReducers from './authReducers';
import courseReducers from './courseReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	authState: authReducers,
	courseState: courseReducers,
});

export default rootReducer;
