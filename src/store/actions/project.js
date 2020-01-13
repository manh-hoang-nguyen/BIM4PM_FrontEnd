import axios from 'axios';
import { API_ENDPOINT } from '../../constants/index';
import {
  PROJECT_CREATED_SUCCESS,
  PROJECT_CREATED_FAIL,
  PROJECT_CREATED_START,
  SCHEDULES_FETCHED_FAIL,
  SCHEDULES_FETCHED_START,
  SCHEDULES_FETCHED_SUCCESS,
} from './types';

// create project
export const create = (name, description) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, description });

  try {
    dispatch({
      type: PROJECT_CREATED_START,
    });
    const res = await axios.post('/api/v1/projects', body, config);

    dispatch({
      type: PROJECT_CREATED_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_CREATED_FAIL,
      payload: error,
    });
  }
};

export const getSchedules = projectId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    dispatch({
      type: SCHEDULES_FETCHED_START,
    });

    const res = await axios.get(
      `${API_ENDPOINT}/project/${projectId}/schedules`,
      config,
    );

    dispatch({
      type: SCHEDULES_FETCHED_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULES_FETCHED_FAIL,
      payload: error,
    });
  }
};
