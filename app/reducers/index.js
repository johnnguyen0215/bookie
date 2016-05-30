import { combineReducers } from 'redux';
import user from 'reducers/user'
import campus from 'reducers/campus'
import search from 'reducers/search'
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
	user,
	campus,
	search,
	routing
});

export default rootReducer;
