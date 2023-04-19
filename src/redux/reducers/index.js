import { combineReducers } from 'redux';
import post from './post';
import common from './common';
import reply from './reply';
import user from './user';

export default combineReducers({
  post,
  common,
  reply,
  user
});