import { combineReducers } from 'redux';
import forum from './forum';
import common from './common';
import user from './user';

export default combineReducers({
  forum,
  common,
  user
});