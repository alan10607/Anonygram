import { combineReducers } from 'redux';
import post from './post';
import console from './console';

export default combineReducers({
  post,
  console
});