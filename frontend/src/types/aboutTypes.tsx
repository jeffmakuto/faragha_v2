export const FETCH_ABOUT_DATA_REQUEST = 'FETCH_ABOUT_DATA_REQUEST';
export const FETCH_ABOUT_DATA_SUCCESS = 'FETCH_ABOUT_DATA_SUCCESS';
export const FETCH_ABOUT_DATA_FAILURE = 'FETCH_ABOUT_DATA_FAILURE';

interface FetchAboutDataRequestAction {
  type: typeof FETCH_ABOUT_DATA_REQUEST;
}

interface FetchAboutDataSuccessAction {
  type: typeof FETCH_ABOUT_DATA_SUCCESS;
  payload: any;
}

interface FetchAboutDataFailureAction {
  type: typeof FETCH_ABOUT_DATA_FAILURE;
  payload: string;
}

export type AboutActionTypes = 
  | FetchAboutDataRequestAction
  | FetchAboutDataSuccessAction
  | FetchAboutDataFailureAction;

export interface AboutState {
  data: any | null;
  loading: boolean;
  error: string | null;
}
