import { UI_SHOW_LOADING, UI_HIDE_LOADING } from './types';

export const show = () => dispatch => {
  dispatch({
    type: UI_SHOW_LOADING,
  });
};

export const hide = () => dispatch => {
  dispatch({
    type: UI_HIDE_LOADING,
  });
};
