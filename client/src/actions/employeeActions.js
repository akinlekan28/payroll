import axios from "axios";
import {
  VIEW_EMPLOYEES,
  EMPLOYEE_LOADING,
  GET_ERRORS,
  ADD_EMPLOYEE,
  CLEAR_ERRORS
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
