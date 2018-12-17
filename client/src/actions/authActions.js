import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, GET_SUCCESS, CLEAR_ERRORS } from './types';

//Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
    .then(res => history.push('/'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

//Login user
export const loginUser = userData => dispatch => {
    axios.post('/api/users/register', userData)
    .then(res => {
        //Save to local storage
        const {token} = res.data;

        //Set token to local storage
        localStorage.setItem('jwtToken', token);

        //Set auth token to header
        setAuthToken(token);

        //Decode token to get user data
        const decoded = jwt_decode(token);

        //Set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//set logged in user
export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    }
  }
  
  //log user out
  export const logoutUser = () => dispatch => {
    //remove token form localstorage
    localStorage.removeItem('jwtToken');
    //remove auth header for future requests
    setAuthToken(false);
    //set current user to {} which also sets isAuthenticated to false
    dispatch(setCurrentUser({}));
  }


  //Clear Error
export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    }
  }