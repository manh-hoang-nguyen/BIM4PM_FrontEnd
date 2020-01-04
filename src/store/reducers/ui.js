import { UI_SHOW_LOADING, UI_HIDE_LOADING } from '../actions/types';

const initialState = {
  showLoading: false,
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case UI_SHOW_LOADING:
      return {
        ...state,
        showLoading: true,
      };
    case UI_HIDE_LOADING:
      return {
        ...state,
        UI_HIDE_LOADING,
      };
    default:
      return state;
  }
};

export default reducer;
