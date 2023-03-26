import { combineReducers } from 'redux';
import post from './post';
import common from './common';
import user from './user';

export default combineReducers({
  post,
  common,
  user
});