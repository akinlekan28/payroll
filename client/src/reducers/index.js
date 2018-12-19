import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import dashReducer from './dashReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    dashboard: dashReducer
});