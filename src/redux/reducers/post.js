import {
  FIND_ID_SET,
  FIND_POST, CREATE_POST,
  FIND_TOP_CONT, REPLY_POST,
  LIKE_CONTENT, UNLIKE_CONTENT,
  UPLOAD_IMG,
  SHOW_CONSOLE, NEED_RELOAD
} from "../type";
  
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

    case FIND_TOP_CONT:
      newState.get(data[0].id).contList.push(...data);
      return newState;

    case LIKE_CONTENT:
      newState.get(data.id).contList[data.no].isUserLike = true;
      newState.get(data.id).contList[data.no].likes++;
      return newState;

    case UNLIKE_CONTENT:
      newState.get(data.id).contList[data.no].isUserLike = false;
      newState.get(data.id).contList[data.no].likes--;
      return newState;

    case UPLOAD_IMG:
      return newState.get(data.id).imgUrl = data.imgUrl;

    default:
      return preState;
  }
}