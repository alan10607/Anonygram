import { combineReducers } from 'redux';
import post from './post';
import common from './common';

export default combineReducers({
  post,
  common
});