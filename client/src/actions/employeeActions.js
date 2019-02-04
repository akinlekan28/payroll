import axios from "axios";
import {
  VIEW_EMPLOYEES,
  EMPLOYEE_LOADING,
  GET_ERRORS,
  ADD_EMPLOYEE,
  GET_EMPLOYEE,
  CLEAR_ERRORS,
  DELETE_EMPLOYEE
} from "./types";

//Post employeee
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
    .catch(
      err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }),
      dispatch(() => {
        setTimeout(function() {
          dispatch(clearErrors());
        }, 5000);
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
        payload: err.response.data
      })
    );
};

//Delete employee
export const deleteEmployee = employeeId => dispatch => {
  return axios
    .post(`/api/employee/${employeeId}`)
    .then(res =>
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: employeeId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get single employee
export const getEmployee = employeeId => dispatch => {
  dispatch(setEmployeeLoading());
  axios
    .get(`/api/employee/single/${employeeId}`)
    .then(res =>
      dispatch({
        type: GET_EMPLOYEE,
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

export const editEmployee = (employeeId, employeeData) => dispatch => {
  return axios
    .put(`/api/employee/${employeeId}`, employeeData)
    .then(res =>
      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(
      err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }),
      dispatch(() => {
        setTimeout(function() {
          dispatch(clearErrors());
        }, 5000);
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
