import {
  FETCH_PARAMETERCATEGORY_FAIL,
  FETCH_PARAMETERCATEGORY_START,
  FETCH_PARAMETERCATEGORY_SUCCESS,
  FETCH_REVITELEMENT_FAIL,
  FETCH_REVITELEMENT_START,
  FETCH_REVITELEMENT_SUCCESS,
  SCHEDULE_FETCHED_FAIL,
  SCHEDULE_FETCHED_SUCCESS,
  SCHEDULE_FETCHED_START,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  schedule: {},
  revitElements: [],
  paramCategories: [],
  parameters: [],
  selectedCategories: [],
  selectedParameters: [],
};
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_REVITELEMENT_START:
    case FETCH_PARAMETERCATEGORY_START:
    case SCHEDULE_FETCHED_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PARAMETERCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        paramCategories: payload,
      };

    case FETCH_REVITELEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        revitElements: payload,
      };

    case SCHEDULE_FETCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        schedule: payload,
        parameters: payload.parameters,
      };

    case FETCH_PARAMETERCATEGORY_FAIL:
    case FETCH_REVITELEMENT_FAIL:
    case SCHEDULE_FETCHED_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
