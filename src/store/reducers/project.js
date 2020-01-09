import {} from '../actions/types';

const initialState = {
  project: {},
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 1:
      return state;
    default:
      return state;
  }
};

export default reducer;
