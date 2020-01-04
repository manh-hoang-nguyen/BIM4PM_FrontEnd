import axios from 'axios';

import { HOME_SUCCESS, HOME_FAIL } from './types';

const homeFaile = payload => {
  return {
    type: HOME_FAIL,
    payload,
  };
};

export const fetchProjects = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/projects');

    if (res.data.success) {
      dispatch({
        type: HOME_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch(homeFaile(res.data.data));
    }
  } catch (err) {
    dispatch(homeFaile(err));
  }
};
