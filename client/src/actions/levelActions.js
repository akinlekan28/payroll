import axios from "axios";
import {
  VIEW_LEVELS,
  LEVELS_LOADING,
  GET_ERRORS,
  DELETE_LEVEL,
  CLEAR_ERRORS,
  ADD_LEVEL
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

//Get single employee level
export const getLevel = id => dispatch => {
  dispatch(setLevelsLoading());
  axios
    .get(`/api/level/single/${id}`)
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

//Edit employee level
export const editLevel = levelData => dispatch => {
  return axios
    .post("/api/level/", levelData)
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

//Delete employee level
export const deleteLevel = id => dispatch => {
  return axios
    .post(`/api/level/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_LEVEL,
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

//Add bonus to level
export const addBonus = (bonusDetails, id) => dispatch => {
  dispatch(clearErrors());
  return axios
    .post(`/api/level/bonus/${id}`, bonusDetails)
    .then(res =>
      dispatch({
        type: VIEW_LEVELS,
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

//Delete level bonus
export const deleteBonus = (levelId, bonusId) => dispatch => {
  return axios
    .delete(`/api/level/bonus/${levelId}/${bonusId}`)
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

//Add deductable to level
export const addDeductable = (deductableDetails, id) => dispatch => {
  dispatch(clearErrors());
  return axios
    .post(`/api/level/deductable/${id}`, deductableDetails)
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
      }),
      dispatch(() => {
        setTimeout(function() {
          dispatch(clearErrors())
        }, 5000);
      })
    );
};

//Delete level bonus
export const deleteDeductable = (levelId, deductableId) => dispatch => {
  return axios
    .delete(`/api/level/deductable/${levelId}/${deductableId}`)
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
