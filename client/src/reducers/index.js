import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import dashReducer from './dashReducer';
import levelReducer from './levelReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    dashboard: dashReducer,
    levels: levelReducer
});