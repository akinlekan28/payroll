import { VIEW_EMPLOYEES, EMPLOYEE_LOADING, ADD_EMPLOYEE, GET_EMPLOYEE, DELETE_EMPLOYEE } from "../actions/types";

const initialState = {
  employees: [],
  employee: {},
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
          employees: [action.payload, ...state.employees],
          loading: false
      };

    case DELETE_EMPLOYEE:
     return {
       ...state,
       employees: state.employees.filter(employee => employee._id !== action.payload)
     }

    case GET_EMPLOYEE:
     return {
       ...state,
       employee: action.payload,
       loading: false
     }

    case EMPLOYEE_LOADING:
      return {
          ...state,
          loading: true
      };

    default:
      return state;
  }
}
