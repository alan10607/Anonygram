import { SAVE_ID_LIST, SAVE_FIND_ID_START, UPLOAD_IMG } from "../actions/post";
import {
  SHOW_BIG_BOX,
  CLOSE_BIG_BOX,
  SHOW_CONSOLE,
  CLOSE_CONSOLE,
  SHOW_LOADING,
  CLOSE_LOADING
} from "../actions/common";

const initState = {
  idList : [],
  findIdStart : 0,
  uploadImgUrl : "",
  consoleStr : "",
  isLoading : false,
  isOpenBigBox : false
};

export default function commonReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case SAVE_ID_LIST:
      return Object.assign({}, preState, { idList : data });

    case SAVE_FIND_ID_START:
      return Object.assign({}, preState, { findIdStart : preState.findIdStart + data.length });

    case UPLOAD_IMG:
      return Object.assign({}, preState, { uploadImgUrl : data.imgUrl });

    case SHOW_BIG_BOX:
      return Object.assign({}, preState, { isOpenBigBox : true });

    case CLOSE_BIG_BOX:
      return Object.assign({}, preState, { isOpenBigBox : false });
      
    case SHOW_CONSOLE:
      return Object.assign({}, preState, { consoleStr : data });

    case CLOSE_CONSOLE:
      return Object.assign({}, preState, { consoleStr : "" });

    case SHOW_LOADING:
      return Object.assign({}, preState, { isLoading : true });

    case CLOSE_LOADING:
      return Object.assign({}, preState, { isLoading : false });

    default:
      return preState;
  }
}