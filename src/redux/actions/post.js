import { post } from "../../cmn/postApi";
import { 
  FIND_ID_SET, FIND_POST, 
  CREATE_POST, 
  FIND_TOP_CONT,
  SHOW_CONSOLE, NEED_RELOAD } from "../constant";

export const findIdSet = () => {
  return (dispatch) => {
    post(FIND_ID_SET, {}).then((idList) => {
      dispatch({ type: FIND_ID_SET, data : idList });
    }).catch((e) => {
      dispatch({ type: SHOW_CONSOLE, data : "看起來泡麵打翻機台了, 請稍後再進來試試" });
    });
  }
}

export const findPost = (data) => {
  return (dispatch) => {
    post(FIND_POST, data).then((artList) => {
      dispatch({ type: FIND_POST, data : artList })
    }).catch((e) => {
      dispatch({ type: SHOW_CONSOLE, str : "讀取文章異常" })
    });
  }
}

export const createPost = (data) => {
  return (dispatch) => {
    post(CREATE_POST, data).then((res) => {
      dispatch({ type: SHOW_CONSOLE, str : "文章發佈成功!!" });
      dispatch({ type: NEED_RELOAD });
    }).catch((e) => {
      dispatch({ type: SHOW_CONSOLE, str : "文章發布失敗, 請稍後再試" });
    });
  }
}

export const findTopCont = (data) => {
  return (dispatch) => {
    post(FIND_TOP_CONT, data).then((contList) => {
      dispatch({ type: FIND_TOP_CONT, data : contList })
    }).catch((e) => {
      dispatch({ type: SHOW_CONSOLE, str : "讀取留言異常" })
    });
  }
}
