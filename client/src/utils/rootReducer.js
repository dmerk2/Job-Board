import { combineReducers } from 'redux';
import jobSlice from './jobSlice';

const rootReducer = combineReducers({
  job: jobSlice,
});

export default rootReducer;