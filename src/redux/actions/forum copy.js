import i18next from "i18next";
import postService from "../../service/request/postService";
import { resetUserData } from "./user";
import { resetReplyData, replyAddImg } from "./reply";
import { 
  showConsole, 
  showLoading, 
  closeLoading,
  closeBigBox
} from "./common";

/* --- 同時也是request url --- */
export const SET_ALL_ID = "findIdSet";
export const SET_ALL_ARTICLE = "findPost";
export const CREATE_POST = "createPost";
export const DELETE_ARTICLE = "deletePost";
export const SET_ALL_CONTENT = "findTopCont";
export const SET_ARTICLE = "replyPost";
export const DELETE_CONTENT = "deleteContent";
export const UPDATE_CONTENT_LIKE = "likeContent";
export const UNUPDATE_CONTENT_LIKE = "unlikeContent";
export const UPLOAD_IMG = "uploadImg";

export const DELETE_ALL_ID = "resetPostData";

/* --- 查詢所有文章id --- */
export const findIdSet = () => (dispatch) => {
  postService.findIdSet({}).then((idList) => {
    dispatch({ type: SET_ALL_ID, data : idList });
  }).catch((e) => {
    dispatch(showConsole(i18next.t("findIdSet-err")));
  });
}

/* --- 查詢文章 --- */
export const findPost = (data) => (dispatch, getState) => {
  postService.findPost(data).then((artList) => {
    dispatch({ type: SET_ALL_ARTICLE, data : artList });
  }).catch((e) => {
    dispatch(showConsole(i18next.t("findPost-err")));
  });
}

/* --- 新增文章 --- */
export const createPost = (data) => (dispatch) => {
  postService.createPost(data).then((res) => {
    dispatch(showConsole(i18next.t("createPost-ok")));
    dispatch(resetPostData());
    dispatch(resetReplyData());
  }).catch((e) => {
    dispatch(showConsole(i18next.t("createPost-err")));
  });
}

/* --- 刪除文章 --- */
export const deletePost = (data) => (dispatch) => {
  postService.deletePost(data).then((res) => {
    dispatch({ type: DELETE_ARTICLE, data : data });
    dispatch(showConsole(i18next.t("deletePost-ok")));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("deletePost-err")));
  });
}

/* --- 查詢留言 --- */
export const findTopCont = (data) => (dispatch) => {
  postService.findTopCont(data).then((contList) => {
    dispatch({ type: SET_ALL_CONTENT, data : contList });
  }).catch((e) => {
    dispatch(showConsole(i18next.t("findTopCont-err")));
  });
}

/* --- 新增留言 --- */
export const replyPost = (data) => (dispatch) => {
  postService.replyPost(data).then((cont) => {
    dispatch({ type: SET_ARTICLE, data : cont});
    dispatch(resetReplyData());
  }).catch((e) => {
    dispatch(showConsole(i18next.t("replyPost-err")));
  });
}

/* --- 刪除留言 --- */
export const deleteCont = (data) => (dispatch) => {
  postService.deleteCont(data).then((res) => {
    dispatch({ type: DELETE_CONTENT, data : data });
    dispatch(showConsole(i18next.t("deleteCont-ok")));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("deleteCont-err")));
  });
}

/* --- 按讚 --- */
export const likeContent = (data) => (dispatch) => {
  postService.likeContent(data).then((res) => {
    dispatch({ type: UPDATE_CONTENT_LIKE, data : data });
  }).catch((e) => console.log("Like content failed!!") );
}

/* --- 取消按讚 --- */
export const unlikeContent = (data) => (dispatch) => {
  postService.unlikeContent(data).then((res) => {
    dispatch({ type: UNUPDATE_CONTENT_LIKE, data : data });
  }).catch((e) => console.log("Unlike content failed!!") );
}

/* --- 圖片上傳 --- */
export const uploadImg = (data) => (dispatch) => {
  dispatch(showLoading());
  postService.uploadImg(data).then((imgData) => {
    dispatch(replyAddImg(imgData.imgUrl));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("uploadImg-err")));
  }).finally(() => {
    dispatch(closeLoading());
  });
}

/* --- 重設資料 --- */
export const resetPostData = () => (dispatch) => {
  dispatch({ type: DELETE_ALL_ID });
  dispatch(closeBigBox());
  dispatch(closeLoading());
}

export const resetAllData = () => (dispatch) => {
  dispatch(resetPostData());
  dispatch(resetUserData());
  dispatch(resetReplyData());
}