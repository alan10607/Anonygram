import {
  SAVE_ID_LIST,
  SAVE_FIND_ID_START,
  SAVE_UPLOAD_IMG_URL,
  SAVE_REPLY_ID,
  SHOW_BIG_BOX,
  CLOSE_BIG_BOX,
  SHOW_CONSOLE,
  CLOSE_CONSOLE,
  SHOW_LOADING,
  CLOSE_LOADING,
} from "../actions/common";

const initState = {
  idList: [],
  findIdStart: 0,
  uploadImgUrl: "",
  replyId: "",
  consoleStr: "",
  isLoading: false,
  openBigBoxId: ""
};

export default function commonReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case SAVE_ID_LIST:
      return Object.assign({}, preState, { idList: data });

    case SAVE_FIND_ID_START:
      return Object.assign({}, preState, { findIdStart: data });

    case SAVE_UPLOAD_IMG_URL:
      return Object.assign({}, preState, { uploadImgUrl: data });

    case SAVE_REPLY_ID:
      return Object.assign({}, preState, { replyId: data });

    case SHOW_BIG_BOX:
      return Object.assign({}, preState, { openBigBoxId: data });

    case CLOSE_BIG_BOX:
      return Object.assign({}, preState, { openBigBoxId: "" });

    case SHOW_CONSOLE:
      return Object.assign({}, preState, { consoleStr: data });

    case CLOSE_CONSOLE:
      return Object.assign({}, preState, { consoleStr: "" });

    case SHOW_LOADING:
      return Object.assign({}, preState, { isLoading: true });

    case CLOSE_LOADING:
      return Object.assign({}, preState, { isLoading: false });

    default:
      return preState;
  }
}