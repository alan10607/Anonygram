import { locationReload } from "../../utli/reolad";
import {
  SAVE_ID_LIST,
  SAVE_FIND_ID_START,
  SAVE_UPLOAD_IMG_URL,
  SHOW_BIG_BOX,
  CLOSE_BIG_BOX,
  SHOW_CONSOLE,
  CLOSE_CONSOLE,
  SHOW_LOADING,
  CLOSE_LOADING,
  DISPATCH_RELOAD
} from "../actions/common";

const initState = {
  idList: [],
  findIdStart: 0,
  uploadImgUrl: "",
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
      return Object.assign({}, preState, { findIdStart: preState.findIdStart + data.length });

    case SAVE_UPLOAD_IMG_URL:
      return Object.assign({}, preState, { uploadImgUrl: data.imgUrl });

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

    case DISPATCH_RELOAD:
      locationReload(800);
      return preState;

    default:
      return preState;
  }
}