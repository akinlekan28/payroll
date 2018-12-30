import axios from "axios";
import {
  ADD_EXCEPTION,
  VIEW_EXCEPTIONS,
  DELETE_EXCEPTION,
  EXCEPTION_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS
} from "./types";

//Add salaryexception
export const addException = exceptionDetails => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/exception", exceptionDetails)
    .then(res =>
      dispatch({
        type: ADD_EXCEPTION,
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

//Set loding state
export const setLevelsLoading = () => {
  return {
    type: EXCEPTION_LOADING
  };
};

//Clear errors
const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
