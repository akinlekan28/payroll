import axios from "axios";
import {
  VIEW_LEVELS,
  LEVELS_LOADING,
  GET_ERRORS,
  ADD_LEVEL,
  DELETE_LEVEL,
  CLEAR_ERRORS
} from "./types";

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
        payload: err.response.data
      })
    );
};

//Add employee level
export const addLevel = levelDetails => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/level/", levelDetails)
    .then(res =>
      dispatch({
        type: ADD_LEVEL,
        payload: res.payload
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete employee level
export const deleteLevel = levelId => dispatch => {
  return axios
    .delete(`/api/level/${levelId}`)
    .then(res =>
      dispatch({
        type: DELETE_LEVEL,
        payload: res.payload
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add bonus to level
export const addBonus = bonusDetails => dispatch => {
  dispatch(clearErrors());
  return axios
    .post("/api/level/bonus", bonusDetails)
    .then(res =>
      dispatch({
        type: ADD_LEVEL,
        payload: res.payload
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
    type: LEVELS_LOADING
  };
};

//Clear errors
const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
