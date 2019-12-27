import {
  PROJECT_CREATED_SUCCESS,
  PROJECT_CREATED_FAIL,
  PROJECT_CREATED_START
} from "../actions/types";

const initialState = {
  project: {}, 
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROJECT_CREATED_START:
        return{
          ...state,
          loading: true
        }
    case PROJECT_CREATED_SUCCESS:
      return {
        ...state,
        loading: false, 
        project: payload
      };
    case PROJECT_CREATED_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default reducer;
