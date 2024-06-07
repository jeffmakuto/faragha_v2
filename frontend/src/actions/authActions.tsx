import * as authTypes from '../types/authTypes';

// Signup action creators
export const signupRequest = (email: string, username: string, password: string) => ({
  type: authTypes.SIGNUP_REQUEST,
  payload: { email, username, password },
});

export const signupSuccess = () => ({
  type: authTypes.SIGNUP_SUCCESS,
});

export const signupFailure = (error: string) => ({
  type: authTypes.SIGNUP_FAILURE,
  payload: { error },
});

// Login action creators
export const loginRequest = (identifier: string, password: string) => ({
  type: authTypes.LOGIN_REQUEST,
  payload: { identifier, password },
});

export const loginSuccess = () => ({
  type: authTypes.LOGIN_SUCCESS,
});

export const loginFailure = (error: string) => ({
  type: authTypes.LOGIN_FAILURE,
  payload: { error },
});
