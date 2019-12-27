import { HOME_SUCCESS, HOME_FAIL } from "../actions/types";

const initialState = {
  projects: [],
  loading: true,
  error: null
};

 const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_SUCCESS:
      return {
        ...state,
        projects: payload,
        loading: false
      };
    case HOME_FAIL:
        return {
            ...state,
            error: payload,
            loading: false
        }
    default:
      return state;
  }
};

export default reducer;