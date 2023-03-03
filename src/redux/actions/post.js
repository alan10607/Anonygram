import { post } from "../../cmn/postApi";
import { FIND_POST, CREATE_POST, SHOW_CONSOLE, NEED_RELOAD } from "../constant";

export const findPost = (data) => {
  return (dispatch) => {
    post(FIND_POST, {}).then((contList) => {
      dispatch({ type: FIND_POST, data : contList })
    }).catch((e) => {
      dispatch({ type: SHOW_CONSOLE, str : "讀取留言異常" })
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