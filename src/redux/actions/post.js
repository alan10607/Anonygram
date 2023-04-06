import i18next from "i18next";
import { postApi } from "../../service";
import { deleteUserData } from "./user";
import postService from "../../service/postService";
import { 
  saveIdList, 
  saveFindIdStart, 
  saveUploadImgUrl,
  saveReplyId, 
  showConsole, 
  showLoading, 
  closeLoading,
  closeBigBox,
  dispatchReload
} from "./common";


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

export const RESET_POST_DATA = "resetPostData";

/* --- 查詢所有文章id --- */
export const findIdSet = () => (dispatch) => {
  postService.findIdSet({}).then((idList) => {
    dispatch({ type: FIND_ID_SET, data : idList });
    dispatch(saveIdList(idList));
    dispatch(saveFindIdStart(0));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("findIdSet-err")));
  });
}

/* --- 查詢文章 --- */
export const findPost = (data) => (dispatch, getState) => {
  postService.findPost(data).then((artList) => {
    dispatch({ type: FIND_POST, data : artList });
    dispatch(saveFindIdStart(getState().common.findIdStart + artList.length));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("findPost-err")));
  });
}

/* --- 新增文章 --- */
export const createPost = (data) => (dispatch) => {
  postService.createPost(data).then((res) => {
    dispatch(showConsole(i18next.t("createPost-ok")));
    dispatch(dispatchReload());
  }).catch((e) => {
    dispatch(showConsole(i18next.t("createPost-err")));
  });
}

/* --- 刪除文章 --- */
export const deletePost = (data) => (dispatch) => {
  postService.deletePost(data).then((res) => {
    dispatch({ type: DELETE_POST, data : data });
    dispatch(showConsole(i18next.t("deletePost-ok")));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("deletePost-err")));
  });
}

/* --- 查詢留言 --- */
export const findTopCont = (data) => (dispatch) => {
  postService.findTopCont(data).then((contList) => {
    dispatch({ type: FIND_TOP_CONT, data : contList });
  }).catch((e) => {
    dispatch(showConsole(i18next.t("findTopCont-err")));
  });
}

/* --- 新增留言 --- */
export const replyPost = (data) => (dispatch, getState) => {
  postService.replyPost(data).then((res) => {
    const state = getState();
    const findTopContData = {
      id : data.id, 
      no : state.post.get(data.id).contList.length
    };
    dispatch(findTopCont(findTopContData));
    dispatch({ type: REPLY_POST, data : data});
    dispatch(saveReplyId(""));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("replyPost-err")));
  });
}

/* --- 刪除留言 --- */
export const deleteCont = (data) => (dispatch) => {
  postService.deleteCont(data).then((res) => {
    dispatch({ type: DELETE_CONT, data : data });
    dispatch(showConsole(i18next.t("deleteCont-ok")));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("deleteCont-err")));
  });
}

/* --- 按讚 --- */
export const likeContent = (data) => (dispatch) => {
  postService.likeContent(data).then((res) => {
    dispatch({ type: LIKE_CONTENT, data : data });
  }).catch((e) => console.log("Like content failed", e) );
}

/* --- 取消按讚 --- */
export const unlikeContent = (data) => (dispatch) => {
  postService.unlikeContent(data).then((res) => {
    dispatch({ type: UNLIKE_CONTENT, data : data });
  }).catch((e) => console.log("Unlike content failed", e) );
}

/* --- 圖片上傳 --- */
export const uploadImg = (data) => (dispatch) => {
  dispatch(showLoading());
  postService.uploadImg(data).then((imgData) => {
    dispatch(saveUploadImgUrl(imgData.imgUrl));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("uploadImg-err")));
  }).finally(() => {
    dispatch(closeLoading());
  });
}

export const resetPostData = (data) => (dispatch) => {
  dispatch({ type: RESET_POST_DATA });
  dispatch(saveIdList([]));
  dispatch(saveFindIdStart(0));
  dispatch(saveReplyId(""));
  dispatch(closeBigBox());
  dispatch(closeLoading());
  dispatch(deleteUserData());
}