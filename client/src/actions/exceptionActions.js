import axios from "axios";
import {
  ADD_EXCEPTION,
  VIEW_EXCEPTIONS,
  DELETE_EXCEPTION,
  EXCEPTION_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS
} from "./types";

//Add salary exception
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

//View salary exceptions
export const getExceptions = () => dispatch => {
  dispatch(setExceptionLoading());
  axios
    .get("/api/exception")
    .then(res =>
      dispatch({
        type: VIEW_EXCEPTIONS,
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

//Delete exception
export const deleteException = () => dispatch => {};

//Set loding state
export const setExceptionLoading = () => {
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
