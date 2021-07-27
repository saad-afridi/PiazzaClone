import userReducers from './userReducers';
import courseReducers from './courseReducers';
import errorReducers from './errorReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	userState: userReducers,
	courseState: courseReducers,
	errorState: errorReducers,
});

export default rootReducer;
