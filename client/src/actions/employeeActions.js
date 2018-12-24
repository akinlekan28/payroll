import axios from "axios";
import {
  VIEW_EMPLOYEES,
  EMPLOYEE_LOADING,
  GET_ERRORS,
  ADD_EMPLOYEE,
  CLEAR_ERRORS,
  DELETE_EMPLOYEE
} from "./types";

//Post employee
export const registerEmployee = employeeData => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/employee", employeeData)
    .then(res =>
      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get all employees
export const getEmployees = () => dispatch => {
  dispatch(setEmployeeLoading());
  axios
    .get("/api/employee")
    .then(res =>
      dispatch({
        type: VIEW_EMPLOYEES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

export const deleteEmployee = employeeId => dispatch => {
  return axios
    .delete(`/api/employee/${employeeId}`)
    .then(res =>
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set loading state
export const setEmployeeLoading = () => {
  return {
    type: EMPLOYEE_LOADING
  };
};

//Clear errors
const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
