import axios from 'axios';
import {
  FETCH_PARAMETERCATEGORY_FAIL,
  FETCH_PARAMETERCATEGORY_START,
  FETCH_PARAMETERCATEGORY_SUCCESS,
  SCHEDULE_FETCHED_FAIL,
  SCHEDULE_FETCHED_START,
  SCHEDULE_FETCHED_SUCCESS,
  FETCH_REVITELEMENT_FAIL,
  FETCH_REVITELEMENT_START,
  FETCH_REVITELEMENT_SUCCESS,
  SCHEDULE_UPDATED_START,
  SCHEDULE_UPDATED_SUCCESS,
  SCHEDULE_UPDATED_FAIL,
} from './types';

import { API_ENDPOINT } from '../../constants';
import serializeRevitElement from '../../utils/serializeRevitElement';

export const getRevitElements = (projectId, categories) => async dispatch => {
  try {
    dispatch({ type: FETCH_REVITELEMENT_START });

    const params = {
      category: categories.join(','),
    };

    const res = await axios.get(
      `${API_ENDPOINT}/project/${projectId}/elements`,
      {
        params,
      },
    );

    dispatch({ type: FETCH_REVITELEMENT_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: FETCH_REVITELEMENT_FAIL, payload: error });
  }
};

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
      `${API_ENDPOINT}/project/${projectId}/parametersofcategory`,
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

export const getSchedule = (projectId, scheduleId) => async dispatch => {
  try {
    dispatch({ type: SCHEDULE_FETCHED_START });

    const res = await axios.get(
      `${API_ENDPOINT}/project/${projectId}/schedules/${scheduleId}`,
    );

    dispatch({
      type: SCHEDULE_FETCHED_SUCCESS,
      payload: res.data.data,
    });
    try {
      dispatch({ type: FETCH_REVITELEMENT_START });

      const params = {
        category: res.data.data.categories.join(','),
      };

      const resRvtElement = await axios.get(
        `${API_ENDPOINT}/project/${projectId}/elements`,
        {
          params,
        },
      );

      const revitElements = resRvtElement.data.data.map(item =>
        serializeRevitElement(item),
      );
      dispatch({ type: FETCH_REVITELEMENT_SUCCESS, payload: revitElements });
    } catch (error) {
      dispatch({ type: FETCH_REVITELEMENT_FAIL, payload: error });
    }
  } catch (error) {
    dispatch({
      type: SCHEDULE_FETCHED_FAIL,
      payload: error,
    });
  }
};
