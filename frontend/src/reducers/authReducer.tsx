import * as authTypes from '../types/authTypes';

interface AuthState {
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
};

const authReducer = (state = initialState, auth: any): AuthState => {
  switch (auth.type) {
    case authTypes.SIGNUP_REQUEST:
    case authTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case authTypes.SIGNUP_SUCCESS:
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case authTypes.SIGNUP_FAILURE:
    case authTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: auth.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
