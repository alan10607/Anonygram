import { combineReducers } from 'redux';
import idSet from './idSet';
import post from './post';
import console from './console';

export default combineReducers({
  idSet,
  post,
  console
});