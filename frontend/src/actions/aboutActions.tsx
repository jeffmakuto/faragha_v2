import { Dispatch } from 'redux';
import api from '../utils/api';
import {
  FETCH_ABOUT_DATA_REQUEST,
  FETCH_ABOUT_DATA_SUCCESS,
  FETCH_ABOUT_DATA_FAILURE,
  AboutActionTypes
} from '../types/aboutTypes';

export const fetchAboutData = () => {
  return async (dispatch: Dispatch<AboutActionTypes>) => {
    dispatch({ type: FETCH_ABOUT_DATA_REQUEST });

    try {
      const response = await api.get('/about');
      const data = response.data;
      dispatch({ type: FETCH_ABOUT_DATA_SUCCESS, payload: data });
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      dispatch({ type: FETCH_ABOUT_DATA_FAILURE, payload: errorMessage });
    }
  };
};
