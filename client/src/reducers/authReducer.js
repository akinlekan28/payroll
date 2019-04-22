import {
  SET_CURRENT_USER,
  ADD_USER,
  GET_SUCCESS,
  VIEW_USERS,
  EMPLOYEE_LOADING,
  ASSIGN_ROLE
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  users: [],
  notification: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };

    case VIEW_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    case ASSIGN_ROLE: 
      return {
        ...state,
        notification: action.payload,
        loading: false
      };

    case GET_SUCCESS:
      return action.payload;

    case EMPLOYEE_LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
}
