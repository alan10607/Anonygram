import postApi from "../../utli/postApi";
import { 
  FIND_ID_SET, 
  FIND_POST, CREATE_POST, 
  FIND_TOP_CONT, REPLY_POST,
  LIKE_CONTENT, UNLIKE_CONTENT,
  UPLOAD_IMG,
  STORE_ID_LIST, STORE_ID_START, SHOW_CONSOLE, NEED_RELOAD
} from "../type";


export const findIdSet = () => (dispatch) => {
  postApi(FIND_ID_SET, {}).then((idList) => {
    dispatch({ type: FIND_ID_SET, data : idList });
    dispatch({ type: STORE_ID_LIST, data : idList });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "看起來泡麵打翻機台了, 請稍後再進來試試" });
  });
}

export const findPost = (data) => (dispatch) => {
  postApi(FIND_POST, data).then((artList) => {
    dispatch({ type: FIND_POST, data : artList });
    dispatch({ type: STORE_ID_START, data : artList });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "讀取文章異常" });
  });
}

export const createPost = (data) => (dispatch) => {
  postApi(CREATE_POST, data).then((res) => {
    dispatch({ type: SHOW_CONSOLE, data : "文章發佈成功!!" });
    dispatch({ type: NEED_RELOAD });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "文章發布失敗, 請稍後再試" });
  });
}

export const findTopCont = (data) => (dispatch) => {
  postApi(FIND_TOP_CONT, data).then((contList) => {
    dispatch({ type: FIND_TOP_CONT, data : contList });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "讀取留言異常" });
  });
}

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

export const likeContent = (data) => (dispatch) => {
  postApi(LIKE_CONTENT, data).then((res) => {
    dispatch({ type: LIKE_CONTENT, data : data });
  }).catch((e) => console.log("Like content failed", e) );
}

export const unlikeContent = (data) => (dispatch) => {
  postApi(UNLIKE_CONTENT, data).then((res) => {
    dispatch({ type: UNLIKE_CONTENT, data : data });
  }).catch((e) => console.log("Unlike content failed", e) );
}

export const uploadImg = (data) => (dispatch) => {
  postApi(UPLOAD_IMG, data).then((imgData) => {
    dispatch({ type: UPLOAD_IMG, data : imgData });
  }).catch((e) => {
    dispatch({ type: SHOW_CONSOLE, data : "上傳圖片失敗, 請稍後再試" });
  });
}