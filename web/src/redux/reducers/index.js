import { combineReducers } from 'redux';
import forums from './forums';
import common from './common';
import user from './user';

export default combineReducers({
  forums,
  common,
  user
});