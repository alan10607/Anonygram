import i18next from "i18next";
import forumRequest from "service/request/forumRequest";
import { resetUserData } from "./user";
import { resetReplyData, replyAddImg } from "./reply";
import {
  showConsole,
  showLoading,
  closeLoading,
  closeBigBox
} from "./common";


export const SET_ALL_ID = "setAllId";
export const DELETE_ALL_ID = "deleteAllId";
export const SET_ALL_ARTICLE = "setAllArticle";
export const SET_ARTICLE = "setArticle";
export const DELETE_ARTICLE = "deleteArticle";
export const SET_ALL_CONTENT = "setAllContent";
export const DELETE_CONTENT = "deleteContent"
export const UPDATE_CONTENT_LIKE = "updateContentLike"

export const setAllId = (ids) => ({ 
  type: SET_ALL_ID, 
  data: ids 
});

export const deleteAllId = () => ({ 
  type: DELETE_ALL_ID 
});

export const setAllArticle = (articles) => ({ 
  type: SET_ALL_ARTICLE, 
  data: articles 
});

export const setArticle = (article) => ({ 
  type: SET_ARTICLE, 
  data: article 
});

export const deleteArticle = (id) => ({ 
  type: DELETE_ARTICLE, 
  data: { id } 
});

export const setAllContent = (contents) => ({ 
  type: SET_ALL_CONTENT, 
  data: contents 
});

export const deleteContent = (id, no) => ({ 
  type: DELETE_CONTENT, 
  data: { id, no } 
});

export const updateContentLike = (id, no, like) => ({ 
  type: UPDATE_CONTENT_LIKE, 
  data: { id, no, like } 
});


export const UPLOAD_IMG = "uploadImg";

/* --- 圖片上傳 --- */
export const uploadImg = (data) => (dispatch) => {
  dispatch(showLoading());
  forumRequest.uploadImg(data).then((imgData) => {
    dispatch(replyAddImg(imgData.imgUrl));
  }).catch((e) => {
    dispatch(showConsole(i18next.t("uploadImg-err")));
  }).finally(() => {
    dispatch(closeLoading());
  });
}

// /* --- 重設資料 --- */
// export const resetPostData = () => (dispatch) => {
//   dispatch({ type: DELETE_ALL_ID });
//   dispatch(closeBigBox());
//   dispatch(closeLoading());
// }

// export const resetAllData = () => (dispatch) => {
//   dispatch(resetPostData());
//   dispatch(resetUserData());
//   dispatch(resetReplyData());
// }