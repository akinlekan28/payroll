import { VIEW_ANALYTICS, ANALYTICS_LOADING } from "../actions/types";

const initialState = {
  dashboard: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_ANALYTICS:
      return {
        ...state,
        dashboard: action.payload,
        loading: false
      };

    case ANALYTICS_LOADING:
      return {
          ...state,
          loading: true
      };

    default:
      return state;
  }
}
