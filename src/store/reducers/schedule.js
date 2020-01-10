import {
  FETCH_PARAMETERCATEGORY_FAIL,
  FETCH_PARAMETERCATEGORY_START,
  FETCH_PARAMETERCATEGORY_SUCCESS,
  FETCH_REVITELEMENT_FAIL,
  FETCH_REVITELEMENT_START,
  FETCH_REVITELEMENT_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  revitElements: [],
  paramCategories: [],
  parameters: [],
};
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_REVITELEMENT_START:
    case FETCH_PARAMETERCATEGORY_START:
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
    case FETCH_PARAMETERCATEGORY_FAIL:
    case FETCH_REVITELEMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
