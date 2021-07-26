import userReducers from './userReducers';
import courseReducers from './courseReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	userState: userReducers,
	courseState: courseReducers,
});

export default rootReducer;
