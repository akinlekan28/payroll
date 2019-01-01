import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import dashReducer from './dashReducer';
import levelReducer from './levelReducer';
import employeeReducer from './employeeReducer';
import exceptionReducer from './exceptionReducer';
import payrollReducer from './payrollReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    dashboard: dashReducer,
    levels: levelReducer,
    employees: employeeReducer,
    exceptions: exceptionReducer,
    payroll: payrollReducer
});