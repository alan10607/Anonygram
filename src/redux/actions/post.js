import { postApi } from "../../utli/api";
import { SHOW_CONSOLE, NEED_RELOAD, SHOW_LOADING, CLOSE_LOADING } from "./common";

/* --- 同時也是request url --- */
export const FIND_ID_SET = "findIdSet";
export const FIND_POST = "findPost";
export const CREATE_POST = "createPost";
export const DELETE_POST = "deletePost";
export const FIND_TOP_CONT = "findTopCont";
export const REPLY_POST = "replyPost";
export const DELETE_CONT = "deleteContent";
export const LIKE_CONTENT = "likeContent";
export const UNLIKE_CONTENT = "unlikeContent";
export const UPLOAD_IMG = "uploadImg";

export const SAVE_ID_LIST = "saveidList";
export const SAVE_FIND_ID_START = "saveFindIdStart";


/* --- 查詢所有文章id --- */
export const findIdSet = () => (dispatch) => {
  postApi(FIND_ID_SET, {}).then((idList) => {
    dispatch({ type: FIND_ID_SET, data : idList });
    dispatch({ type: SAVE_ID_LIST, data : idList });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "看起來泡麵打翻機台了, 請稍後再進來試試" });
  });
}

/* --- 查詢文章 --- */
export const findPost = (data) => (dispatch) => {
  postApi(FIND_POST, data).then((artList) => {
    dispatch({ type: FIND_POST, data : artList });
    dispatch({ type: SAVE_FIND_ID_START, data : artList });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "讀取文章異常" });
  });
}

/* --- 新增文章 --- */
export const createPost = (data) => (dispatch) => {
  postApi(CREATE_POST, data).then((res) => {
    dispatch({ type: SHOW_CONSOLE, data : "文章發佈成功!!" });
    dispatch({ type: NEED_RELOAD });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "文章發布失敗, 請稍後再試" });
  });
}

/* --- 刪除文章 --- */
export const deletePost = (data) => (dispatch) => {
  postApi(DELETE_POST, data).then((res) => {
    dispatch({ type: SHOW_CONSOLE, data : "刪除文章成功" });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "文章刪除失敗, 刪除權限已過期" });
  });
}

/* --- 查詢留言 --- */
export const findTopCont = (data) => (dispatch) => {
  postApi(FIND_TOP_CONT, data).then((contList) => {
    dispatch({ type: FIND_TOP_CONT, data : contList });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "讀取留言異常" });
  });
}

/* --- 新增留言 --- */
export const replyPost = (data) => (dispatch, getState) => {
  postApi(REPLY_POST, data).then((res) => {
    const state = getState();
    const findTopContData = {
      id : data.id, 
      no : state.post.get(data.id).contList.length
    };
    dispatch(findTopCont(findTopContData));
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "留言失敗, 請稍後再試" });
  });
}

/* --- 刪除留言 --- */
export const deleteCont = (data) => (dispatch) => {
  postApi(DELETE_CONT, data).then((res) => {
    dispatch({ type: SHOW_CONSOLE, data : "刪除留言成功" });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "留言刪除失敗, 刪除權限已過期" });
  });
}

/* --- 按讚 --- */
export const likeContent = (data) => (dispatch) => {
  postApi(LIKE_CONTENT, data).then((res) => {
    dispatch({ type: LIKE_CONTENT, data : data });
  }).catch((e) => console.log("Like content failed", e) );
}

/* --- 取消按讚 --- */
export const unlikeContent = (data) => (dispatch) => {
  postApi(UNLIKE_CONTENT, data).then((res) => {
    dispatch({ type: UNLIKE_CONTENT, data : data });
  }).catch((e) => console.log("Unlike content failed", e) );
}

/* --- 圖片上傳 --- */
export const uploadImg = (data) => (dispatch) => {
  dispatch({ type: SHOW_LOADING });
  postApi(UPLOAD_IMG, data).then((imgData) => {
    dispatch({ type: UPLOAD_IMG, data : imgData });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "上傳圖片失敗, 請稍後再試" });
  }).finally(() => {
    dispatch({ type: CLOSE_LOADING });
  });
}