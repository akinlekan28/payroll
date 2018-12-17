import { GET_ERRORS, CLEAR_ERRORS, GET_SUCCESS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_ERRORS:
      return action.payload;

    case CLEAR_ERRORS:
      return {};

    case GET_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}