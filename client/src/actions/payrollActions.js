import axios from "axios";
import {
  VIEW_PAYROLL,
  VIEW_MONTHLY_PAYROLL,
  VIEW_PAYROLL_RECORDS,
  VIEW_PAYROLL_RECORDS_MONTHLY,
  VIEW_PAYROLL_RECORDS_YEARLY,
  VIEW_EMPLOYEE_MONTH_YEAR,
  VIEW_MONTH_YEAR,
  PAYROLL_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

//View single payroll
export const getPayroll = id => dispatch => {
  dispatch(setPayrollLoading());
  return axios
    .get(`/api/payslip/${id}`)
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

//Get aggregate monthly payroll
export const getMonthly = () => dispatch => {
  dispatch(setPayrollLoading());
  axios
    .get("/api/payslip/record/allmonthlyslip")
    .then(res =>
      dispatch({
        type: VIEW_MONTHLY_PAYROLL,
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

//Get employee payslip within a calendar year
export const getEmployeeYearlySlip = id => dispatch => {
  dispatch(setPayrollLoading());
  return axios
    .get(`/api/payslip/record/employeeallslip/${id}`)
    .then(res =>
      dispatch({
        type: VIEW_PAYROLL_RECORDS,
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

//Get all employee payslip within a calendar year
export const getAllYearlyPayslip = () => dispatch => {
  dispatch(setPayrollLoading());
  return axios
    .get("/api/payslip/record/allyear")
    .then(res =>
      dispatch({
        type: VIEW_PAYROLL_RECORDS_YEARLY,
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

//Get monthly employee payslip within a calendar year
export const getMonthlyPayslip = payslipData => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/payslip/record/singlemonthlyslip", payslipData)
    .then(res =>
      dispatch({
        type: VIEW_PAYROLL_RECORDS_MONTHLY,
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

//Get employee payslip by employee, month and year
export const getEmployeeMonthYear = payslipData => dispatch => {
  dispatch(clearErrors);
  return axios
    .post("/api/payslip/record/byemployeemonthyear", payslipData)
    .then(res =>
      dispatch({
        type: VIEW_EMPLOYEE_MONTH_YEAR,
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

//Get employee payslip by month and year
export const getMonthYear = payslipData => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/payslip/record/bymonthyear", payslipData)
    .then(res =>
      dispatch({
        type: VIEW_MONTH_YEAR,
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

//Set loding state
export const setPayrollLoading = () => {
  return {
    type: PAYROLL_LOADING
  };
};

//Clear errors
const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
