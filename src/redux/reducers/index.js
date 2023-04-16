import { combineReducers } from 'redux';
import post from './post';
import common from './common';
import user from './user';
import reply from './reply';

export default combineReducers({
  post,
  common,
  user,
  reply
});