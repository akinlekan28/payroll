import { VIEW_ANALYTICS, ANALYTICS_LOADING, VIEW_NET } from "../actions/types";

const initialState = {
  dashboard: {},
  net: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_ANALYTICS:
      return {
        ...state,
        dashboard: action.payload,
        loading: false
      };

    case VIEW_NET:
      return {
        ...state,
        net: action.payload,
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
