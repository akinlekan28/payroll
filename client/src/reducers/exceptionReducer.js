import {
  ADD_EXCEPTION,
  ADD_OTHER_EXCEPTION,
  VIEW_EXCEPTIONS,
  VIEW_OTHER_EXCEPTION,
  DELETE_EXCEPTION,
  DELETE_OTHER_EXCEPTION,
  EXCEPTION_LOADING
} from "../actions/types";

const initialState = {
  exceptions: [],
  otherexception: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;

    case ADD_EXCEPTION:
      return {
        ...state,
        exceptions: [action.payload, ...state.exceptions],
        loading: false
      };
    case ADD_OTHER_EXCEPTION:
      return {
        ...state,
        otherexception: [action.payload, ...state.otherexception],
        loading: false
      };
    case VIEW_EXCEPTIONS:
      return {
        ...state,
        exceptions: action.payload,
        loading: false
      };
    case VIEW_OTHER_EXCEPTION:
      return {
        ...state,
        otherexception: action.payload,
        loading: false
      };
    case DELETE_EXCEPTION:
      return {
        ...state,
        exceptions: state.exceptions.filter(
          exception => exception._id !== action.payload
        ),
        loading: false
      };
    case DELETE_OTHER_EXCEPTION:
      return {
        ...state,
        otherexception: state.otherexception.filter(
          otherexceptionItem => otherexceptionItem._id !== action.payload
        ),
        loading: false
      };
    case EXCEPTION_LOADING:
      return {
        ...state,
        loading: true
      };
  }
}
