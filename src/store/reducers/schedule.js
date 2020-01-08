import {
  FETCH_CATEGORYANDPARAMETER_FAIL,
  FETCH_CATEGORYANDPARAMETER_START,
  FETCH_CATEGORYANDPARAMETER_SUCCESS,
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
    case FETCH_CATEGORYANDPARAMETER_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORYANDPARAMETER_SUCCESS:
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
    case FETCH_CATEGORYANDPARAMETER_FAIL:
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
