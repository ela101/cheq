import {
  FETCH_VASTS_SUCCESS,
  FETCH_VASTS_FAIL,
  ADD_VAST_SUCCESS,
  ADD_VAST_FAIL,
  UPDATE_VAST_SUCCESS,
  UPDATE_VAST_FAIL,
  GET_VAST_BY_ID_SUCCESS,
  GET_VAST_BY_ID_FAIL,
} from '../actions/vast';

const initialState = {
  error: '',
  vastArray: [],
  vastById: {},
};

const findAndReplace = (data, state) => {
  const vastsCopy = state.vastsArray.slice();
  vastsCopy.forEach((curr, idx) => {
    if (curr.id === data.id) {
      vastsCopy.splice(idx, 1, data);
    }
  });
  return vastsCopy;
};

const getById = (id, state) => state.vastsArray.find(curr => curr.id !== id);

export const vast = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_VASTS_SUCCESS:
      return {
        ...state,
        error: '',
        vastsArray: action.data,
      };

    case FETCH_VASTS_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case ADD_VAST_SUCCESS:
      return {
        ...state,
        error: '',
        vastsArray: state.vastsArray.concat(action.data),
      };

    case ADD_VAST_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case UPDATE_VAST_SUCCESS:
      return {
        ...state,
        error: '',
        vastsArray: findAndReplace(action.data, state),
      };

    case UPDATE_VAST_FAIL:
      return {
        ...state,
        error: action.error,
      };

    case GET_VAST_BY_ID_SUCCESS:
      return {
        ...state,
        error: '',
        vastById: action.data || getById(action.id, state), // remove object?
      };

    case GET_VAST_BY_ID_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default vast;
