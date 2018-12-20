import { VIEW_LEVELS, LEVELS_LOADING } from "../actions/types";

const initialState = {
  levels: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_LEVELS:
      return {
        ...state,
        levels: action.payload,
        loading: false
      };

    case LEVELS_LOADING:
      return {
          ...state,
          loading: true
      };

    default:
      return state;
  }
}
