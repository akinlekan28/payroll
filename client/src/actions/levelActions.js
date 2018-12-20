import axios from "axios";
import { VIEW_LEVELS, LEVELS_LOADING, GET_ERRORS } from "./types";

//Get employee levels
export const getLevels = () => dispatch => {
  dispatch(setLevelsLoading());
  axios
    .get("/api/level/all")
    .then(res =>
      dispatch({
        type: VIEW_LEVELS,
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
export const setLevelsLoading = () => {
  return {
    type: LEVELS_LOADING
  };
};
