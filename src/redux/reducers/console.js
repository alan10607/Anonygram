import { STORE_ID_LIST, STORE_ID_START, SHOW_CONSOLE, CLOSE_CONSOLE, NEED_RELOAD, UPLOAD_IMG } from "../type";

const initState = {
  idList : [],
  idStart : 0,
  consoleStr : "",
  needReload : false
};

export default function consoleReducer(preState = initState, action){
  const {type, data} = action;
  switch(type){
    case STORE_ID_LIST:
      return Object.assign({}, preState, { idList : data });

    case STORE_ID_START:
      return Object.assign({}, preState, { idStart : preState.idStart + data.length });

    case SHOW_CONSOLE:
      return Object.assign({}, preState, { consoleStr : data });

    case CLOSE_CONSOLE:
      return Object.assign({}, preState, { consoleStr : "" });

    case NEED_RELOAD:
      return Object.assign({}, preState, { needReload : true });

    default:
      return preState;
  }
}