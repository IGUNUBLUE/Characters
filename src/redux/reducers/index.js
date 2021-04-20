import { GET_DATA, FILTER_DATA } from "../actions/types";

const initialState = {
  apiResponse: {
    data: {
      students: [],
    },
  },
  filtered: {
    data: {
      students: [],
    },
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        apiResponse: action.payload,
      };

    case FILTER_DATA:
      return {
        ...state,
        filtered: {
          data: {
            students: action.payload,
          },
        },
      };

    default:
      return state;
  }
}

export default reducer;
