import { CONT_STATUS_TYPE } from "../../util/constant";
import {
  SET_ALL_ID,
  DELETE_ALL_ID,
  SET_ALL_ARTICLE,
  SET_ARTICLE,
  DELETE_ARTICLE,
  SET_ALL_CONTENT,
  DELETE_CONTENT,
  UPDATE_CONTENT_LIKE
} from "../actions/forum";

const initForumMap = new Map();

export default function forumReducer(preState = initForumMap, action) {
  const { type, data } = action;
  const newState = new Map(preState);

  console.log("Reducer get data, type=", type, "data=", data);
  switch (type) {
    case SET_ALL_ID:
      data.forEach(id => newState.set(id, null));
      return newState;

    case DELETE_ALL_ID:
      return initState;

    case SET_ALL_ARTICLE:
      data.forEach(art => newState.set(art.id, art));
      return newState;
    
    case SET_ARTICLE:
      // newState.get(data.id).contNum = Math.max(newState.get(data.id).contNum + 1, data.no);
      newState.get(data.id).contList[data.no] = data;
      return newState;

    case DELETE_ARTICLE:
      newState.set(data.id, null);
      return newState;

    case SET_ALL_CONTENT:
      data.forEach((cont) => {
        newState.get(cont.id).contNum = Math.max(newState.get(cont.id).contNum, cont.no);
        newState.get(cont.id).contList[cont.no] = cont;
      });
      return newState;

    case DELETE_CONTENT:
      newState.get(data.id).contList[data.no].status = CONT_STATUS_TYPE.DELETED;
      return newState;

    case UPDATE_CONTENT_LIKE:
      newState.get(data.id).contList[data.no].isUserLike = data.like;
      newState.get(data.id).contList[data.no].likes += data.like ? 1 : -1;
      return newState;

    default:
      return preState;
  }
}