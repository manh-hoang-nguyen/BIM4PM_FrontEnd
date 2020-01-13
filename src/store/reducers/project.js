import {
  SCHEDULES_FETCHED_FAIL,
  SCHEDULES_FETCHED_SUCCESS,
  SCHEDULES_FETCHED_START,
} from '../actions/types';

const initialState = {
  project: {},
  loading: false,
  error: null,
  schedules: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SCHEDULES_FETCHED_START:
      return {
        ...state,
        loading: true,
      };
    case SCHEDULES_FETCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        schedules: payload,
      };
    case SCHEDULES_FETCHED_FAIL:
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
