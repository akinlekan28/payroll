import {
  ADD_EXCEPTION,
  VIEW_EXCEPTIONS,
  DELETE_EXCEPTION,
  EXCEPTION_LOADING
} from "../actions/types";

const initialState = {
  exceptions: [],
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
    case VIEW_EXCEPTIONS:
      return {
        ...state,
        exceptions: action.payload,
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
    case EXCEPTION_LOADING:
      return {
        ...state,
        loading: true
      };
  }
}
