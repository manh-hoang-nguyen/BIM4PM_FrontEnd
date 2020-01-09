import {
  HOME_SUCCESS,
  HOME_FAIL,
  PROJECT_CREATED_SUCCESS,
  PROJECT_CREATED_FAIL,
  PROJECT_CREATED_START,
} from '../actions/types';

const initialState = {
  projects: [],
  loading: true,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_SUCCESS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case HOME_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case PROJECT_CREATED_START:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_CREATED_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [...state.projects, payload],
      };
    case PROJECT_CREATED_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
