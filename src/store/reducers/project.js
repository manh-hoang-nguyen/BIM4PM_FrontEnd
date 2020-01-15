import {
  SCHEDULES_FETCHED_FAIL,
  SCHEDULES_FETCHED_SUCCESS,
  SCHEDULES_FETCHED_START,
  SCHEDULE_CREATED_FAIL,
  SCHEDULE_CREATED_START,
  SCHEDULE_CREATED_SUCCESS,
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
    case SCHEDULE_CREATED_START:
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
    case SCHEDULE_CREATED_SUCCESS:
      return {
        ...state,
        loading: false,
        schedules: [...state.schedules, payload],
      };
    case SCHEDULES_FETCHED_FAIL:
    case SCHEDULE_CREATED_FAIL:
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
