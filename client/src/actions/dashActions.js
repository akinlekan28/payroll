import axios from "axios";
import {
  VIEW_ANALYTICS,
  VIEW_NET,
  ANALYTICS_LOADING,
  GET_ERRORS
} from "./types";

//Get analytics
export const getAnalytics = () => dispatch => {
  dispatch(setAnalyticsLoading());
  axios
    .get("/api/dashboard/analytics")
    .then(res =>
      dispatch({
        type: VIEW_ANALYTICS,
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

export const getNet = () => dispatch => {
  dispatch(setAnalyticsLoading);
  axios
    .get("/api/dashboard/payoverview")
    .then(res =>
      dispatch({
        type: VIEW_NET,
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

//Set loding state
export const setAnalyticsLoading = () => {
  return {
    type: ANALYTICS_LOADING
  };
};
