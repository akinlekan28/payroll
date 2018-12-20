import { VIEW_EMPLOYEES, EMPLOYEE_LOADING, ADD_EMPLOYEE } from "../actions/types";

const initialState = {
  employees: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false
      };

    case ADD_EMPLOYEE:
      return {
          ...state,
          employees: action.payload,
          loading: false
      };

    case EMPLOYEE_LOADING:
      return {
          ...state,
          loading: true
      };

    default:
      return state;
  }
}
