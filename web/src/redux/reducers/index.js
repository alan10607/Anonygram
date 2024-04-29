import { combineReducers } from 'redux';
import discussions from './discussions';
import common from './common';
import user from './user';

export default combineReducers({
  discussions,
  common,
  user
});