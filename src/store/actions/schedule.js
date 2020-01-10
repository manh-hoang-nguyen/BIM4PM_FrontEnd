import {
  FETCH_PARAMETERCATEGORY_FAIL,
  FETCH_PARAMETERCATEGORY_START,
  FETCH_PARAMETERCATEGORY_SUCCESS,
} from './types';
// eslint-disable-next-line import/no-cycle
import { API_ENDPOINT } from '../../constants';

import axios from 'axios';

// export const createSchedule = (name, formData) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const body = JSON.stringify({ name, formData });
//   try {

//   } catch (error) {

//   }
// };

export const fetchCatAndParam = projectId => async dispatch => {
  try {
    dispatch({
      type: FETCH_PARAMETERCATEGORY_START,
    });

    const res = await axios.get(
      `${API_ENDPOINT}/project/${projectId}/parametersofcategory`,
    );

    dispatch({
      type: FETCH_PARAMETERCATEGORY_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PARAMETERCATEGORY_FAIL,
      payload: error,
    });
  }
};

export const fetchProjects = projectId => async dispatch => {
  dispatch({
    type: FETCH_PARAMETERCATEGORY_START,
  });
  try {
    const res = await axios.get(
      `http://localhost:5000/project/${projectId}/parametersofcategory`,
    );

    if (res.data.success) {
      dispatch({
        type: FETCH_PARAMETERCATEGORY_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: FETCH_PARAMETERCATEGORY_FAIL,
        payload: res.data.message,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_PARAMETERCATEGORY_FAIL,
      payload: err,
    });
  }
};
