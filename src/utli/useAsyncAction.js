import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useAxios from './useAxios';
import { reload } from './reolad';
import { useDispatch } from 'react-redux';
import { TokenExpiredError } from './useAxios';

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

export const SHOW_LOADING = "showLoading";
export const CLOSE_LOADING = "closeLoading";

export const SHOW_CONSOLE = "showConsole";

// const { t } = useTranslation();

export const useFindIdSet = () => {};


// export const useFindPost = (data) => {
//   const dispatch = useDispatch();
//   useAsyncAction(FIND_POST, data, (artList) => {
//     dispatch({ type: FIND_POST, data : artList });
//     dispatch({ type: SAVE_FIND_ID_START, data : artList });
//   }, (error) => {
//     dispatch({ type: SHOW_CONSOLE, data : t("findPost-err") });
//   })();
// }

const useAsyncAction = (
  url, 
  data, 
  afterFunc = () => {}, 
  errorFunc = () => {}, 
  loadingFunc = () => {}
) => {
  const [fetchData, res, error, loading] = useAxios(url);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      loadingFunc();
    } else if (error) {
      if(error instanceof TokenExpiredError) navigate("/");
      errorFunc();
    } else if (res) {
      afterFunc();
    }
  }, [res, error, loading])

  return fetchData;
}


// const getHeader = () => {
//   const token = localStorage.getItem(JWT_TOKEN);
//   return token ? { headers : { Authorization : `Bearer ${token}` } } : {}; 
// };


