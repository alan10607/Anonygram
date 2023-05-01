import { CONT_STATUS_TYPE } from "../../util/constant";
import {
  FIND_ID_SET,
  FIND_POST,
  DELETE_POST,
  FIND_TOP_CONT,
  REPLY_POST,
  DELETE_CONT,
  LIKE_CONTENT,
  UNLIKE_CONTENT,
  RESET_POST_DATA
} from "../actions/post";

const initState = new Map();

export default function postReducer(preState = initState, action) {
  const { type, data } = action;
  const newState = new Map(preState);

  switch (type) {
    case FIND_ID_SET:
      data.forEach(id => newState.set(id, null));
      return newState;

    case FIND_POST:
      data.forEach(art => newState.set(art.id, art));
      return newState;

    case DELETE_POST:
      newState.set(data.id, null);
      return newState;

    case FIND_TOP_CONT:
      data.forEach((cont) => {
        newState.get(cont.id).contNum = Math.max(newState.get(cont.id).contNum, cont.no);
        newState.get(cont.id).contList[cont.no] = cont;
      });
      return newState;

    case REPLY_POST:
      newState.get(data.id).contNum = Math.max(newState.get(data.id).contNum + 1, data.no);
      newState.get(data.id).contList[data.no] = data;
      return newState;

    case DELETE_CONT:
      newState.get(data.id).contList[data.no].status = CONT_STATUS_TYPE.DELETED;
      return newState;

    case LIKE_CONTENT:
      newState.get(data.id).contList[data.no].isUserLike = true;
      newState.get(data.id).contList[data.no].likes++;
      return newState;

    case UNLIKE_CONTENT:
      newState.get(data.id).contList[data.no].isUserLike = false;
      newState.get(data.id).contList[data.no].likes--;
      return newState;

    case RESET_POST_DATA:
      return initState;

    default:
      return preState;
  }
}