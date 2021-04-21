import { GET_DATA, FILTER_DATA, ADD_TAGS } from "../actions/types";

const initialState = {
  students: [],
  filtered: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        students: action.payload,
      };

    case FILTER_DATA:
      return {
        ...state,
        filtered: action.payload
      };

      case ADD_TAGS:
      return {
        ...state,
        students: action.payload
      };

    default:
      return state;
  }
}

export default reducer;
