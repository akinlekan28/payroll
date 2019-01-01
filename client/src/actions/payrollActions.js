import axios from "axios";
import { VIEW_PAYROLL, PAYROLL_LOADING, GET_ERRORS } from "./types";

//View single payroll
export const getPayroll = id => dispatch => {
  dispatch(setPayrollLoading());
  return axios
    .get(`/api/tax/singleslip/${id}`)
    .then(res =>
      dispatch({
        type: VIEW_PAYROLL,
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
export const setPayrollLoading = () => {
  return {
    type: PAYROLL_LOADING
  };
};
