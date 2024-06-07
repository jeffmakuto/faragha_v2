import {
  FETCH_ABOUT_DATA_REQUEST,
  FETCH_ABOUT_DATA_SUCCESS,
  FETCH_ABOUT_DATA_FAILURE,
  AboutActionTypes,
  AboutState
} from '../types/aboutTypes';

const initialState: AboutState = {
  data: null,
  loading: false,
  error: null,
};

const aboutReducer = (state = initialState, action: AboutActionTypes): AboutState => {
  switch (action.type) {
    case FETCH_ABOUT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ABOUT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_ABOUT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default aboutReducer;
