import { combineReducers } from 'redux';
import aboutReducer from './aboutReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  about: aboutReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
