import axios from "axios";
import {
  ADD_EXCEPTION,
  ADD_OTHER_EXCEPTION,
  ADD_ONE_OFF_PAYMENT,
  VIEW_EXCEPTIONS,
  VIEW_OTHER_EXCEPTION,
  VIEW_ONE_OFF_PAYMENT,
  DELETE_EXCEPTION,
  DELETE_OTHER_EXCEPTION,
  DELETE_ONE_OFF_PAYMENT,
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
export const deleteException = id => dispatch => {
  return axios
    .post(`/api/exception/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_EXCEPTION,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add other exception
export const addOtherException = otherExceptionDetails => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/individualcost", otherExceptionDetails)
    .then(res =>
      dispatch({
        type: ADD_OTHER_EXCEPTION,
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

//Delete other exception
export const deleteOtherException = id => dispatch => {
  return axios
    .post(`/api/individualcost/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_OTHER_EXCEPTION,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//View other exceptions
export const getOtherExceptions = () => dispatch => {
  dispatch(setExceptionLoading());
  axios
    .get("/api/individualcost")
    .then(res =>
      dispatch({
        type: VIEW_OTHER_EXCEPTION,
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

//Add one off payment
export const addOneOffPayment = paymentData => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/oneoffpayment/", paymentData)
    .then(res =>
      dispatch({
        type: ADD_ONE_OFF_PAYMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }),
      dispatch(() => {
        setTimeout(function() {
          dispatch(clearErrors())
        }, 5000);
      })
    );
};

//View one off payment
export const getOneOffPayments = () => dispatch => {
  dispatch(setExceptionLoading());
  axios
    .get("/api/oneoffpayment/")
    .then(res =>
      dispatch({
        type: VIEW_ONE_OFF_PAYMENT,
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

//Delete one off payment
export const deleteOneOffPayment = id => dispatch => {
  return axios
    .post(`/api/oneoffpayment/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ONE_OFF_PAYMENT,
        payload: id
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
