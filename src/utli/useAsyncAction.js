import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  findIdSet, 

  FIND_POST, 
  SAVE_FIND_ID_START 
} from '../redux/actions/post';
import { showConsole, SHOW_CONSOLE } from '../redux/actions/common';
import useAxios from './useAxios';
import reload from './reload';

/* --- 同時也是request url --- */
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

const { t } = useTranslation();

export const useFindIdSet = (data) => {
  useAsyncAction(FIND_ID_SET, data, (idList) => {
    dispatch({ type: FIND_ID_SET, data : idList });
    dispatch({ type: SAVE_ID_LIST, data : idList });
  }, (error) => {
    dispatch({ type: SHOW_CONSOLE, data : t("findIdSet-err") });
  })();
}

export const useFindPost = (data) => {
  useAsyncAction(FIND_POST, data, (artList) => {
    dispatch({ type: FIND_POST, data : artList });
    dispatch({ type: SAVE_FIND_ID_START, data : artList });
  }, (error) => {
    dispatch({ type: SHOW_CONSOLE, data : t("findPost-err") });
  })();
}

export default useAsyncAction = (
  url, 
  data, 
  afterFunc = () => {}, 
  errorFunc = () => {}, 
  loadingFunc = () => {}
) => {
  const [fetchData, res, error, loading] = useAxios(url);
  useEffect(() => {
    if (loading) {
      loadingFunc();
    } else if (error) {
      
      // if(error instanceof BackendFormatError) reload();
      errorFunc();
    } else if (res) {
      afterFunc();
    }
  }, [res, error, loading])

  return () => { fetchData(data) };
}


// const getHeader = () => {
//   const token = localStorage.getItem(JWT_TOKEN);
//   return token ? { headers : { Authorization : `Bearer ${token}` } } : {}; 
// };

// const isTokenValid = () => {
//   const exp = localStorage.getItem(JWT_TOKEN_EXP);
//   const now = Math.floor(Date.now() / 1000);
//   return tokenExp && );
// }