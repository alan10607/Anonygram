import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useAxios from './useAxios';
import { reload } from './reolad';
import { useDispatch } from 'react-redux';
import { TokenExpiredError } from './useAxios';
import { useTranslation } from 'react-i18next';
import { showConsole } from '../redux/actions/common';

/* --- 同時也是request url --- */
const FIND_ID_SET = "findIdSet";
const FIND_POST = "findPost";
const CREATE_POST = "createPost";
const DELETE_POST = "deletePost";
const FIND_TOP_CONT = "findTopCont";
const REPLY_POST = "replyPost";
const DELETE_CONT = "deleteContent";
const LIKE_CONTENT = "likeContent";
const UNLIKE_CONTENT = "unlikeContent";
const UPLOAD_IMG = "uploadImg";

const SAVE_ID_LIST = "saveidList";
const SAVE_FIND_ID_START = "saveFindIdStart";

const SHOW_LOADING = "showLoading";
const CLOSE_LOADING = "closeLoading";

const SHOW_CONSOLE = "showConsole";


const findIdSet = (idList) => ({ type: FIND_ID_SET, data : idList });
const saveIdList = (idList) => ({ type: SAVE_ID_LIST, data : idList });
const findPost = (artList) => ({ type: FIND_POST, data : artList });
const saveFindIdStart = (artList) => ({ type: SAVE_FIND_ID_START, data : artList });

/* --- 查詢所有文章id --- */
export const useFindIdSet2 = () => useAsyncAction(
  FIND_ID_SET, (idList, t) => (dispatch) => {
    dispatch(findIdSet(idList));
    dispatch(saveIdList(idList));
  }, (error, t) => (dispatch) => {
    dispatch(showConsole(t("findIdSet-err")));
  }
);

export const useFindPost = () => useAsyncAction(
  FIND_POST, (artList, t) => (dispatch) => {    
    dispatch(findPost(artList));
    dispatch(saveFindIdStart(artList));
  }, (error, t) => (dispatch) => {
    dispatch(showConsole(t("findPost-err")));
  }
);

const useActionArray = () => {
  const [actions, setActions] = useState([]);
  const addAction = (newAction) => {
    setActions([...actions, newAction]);
  }
  return [actions, addAction];
}

export const useFindIdSet = () => {
  const [fetchData, res, error, loading] = useAxios(FIND_ID_SET);
  const [action, setAction] = useState({});

  useEffect(() => {
    if (loading) {
    } else if (error) {
      setAction((dispatch) => {    
        dispatch(showConsole(t("findIdSet-err")));
      })
    } else if (res) {
      setAction((dispatch) => {    
        dispatch(findIdSet(idList));
        dispatch(saveIdList(idList));
      })
    }
  }, [res, error, loading])

  return [fetchData, action];
}

const useAsyncAction = (
  url, 
  afterFunc = () => {}, 
  errorFunc = () => {}, 
  loadingStartFunc = () => {},
  loadingEndFunc = () => {},
) => {
  const [fetchData, res, error, loading] = useAxios(url);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      dispatch(loadingStartFunc(t));
    } else if (error) {
      // if(error instanceof TokenExpiredError) navigate("/");
      dispatch(errorFunc(error, t));
      loadingEndFunc(t);
    } else if (res) {
      dispatch(afterFunc(res, t));
      loadingEndFunc(t);
      // afterFunc(t, res)(dispatch);//少了prestate的方法
    }
  }, [res, error, loading])

  return fetchData;
}



// const findIdSet = (idList) => ({ type: FIND_ID_SET, data : idList });
// const saveIdList = (idList) => ({ type: SAVE_ID_LIST, data : idList });
// const findPost = (artList) => ({ type: FIND_POST, data : artList });
// const saveFindIdStart = (artList) => ({ type: SAVE_FIND_ID_START, data : artList });

// /* --- 查詢所有文章id --- */
// export const useFindIdSet = () => useAsyncAction(
//   FIND_ID_SET, (idList, t) => (dispatch) => {
//     dispatch(findIdSet(idList));
//     dispatch(saveIdList(idList));
//   }, (error, t) => (dispatch) => {
//     dispatch(showConsole(t("findIdSet-err")));
//   }
// );

// export const useFindPost = () => useAsyncAction(
//   FIND_POST, (artList, t) => (dispatch) => {    
//     dispatch(findPost(artList));
//     dispatch(saveFindIdStart(artList));
//   }, (error, t) => (dispatch) => {
//     dispatch(showConsole(t("findPost-err")));
//   }
// );

// const useAsyncAction = (
//   url, 
//   afterFunc = () => {}, 
//   errorFunc = () => {}, 
//   loadingFunc = () => {}
// ) => {
//   const [fetchData, res, error, loading] = useAxios(url);
//   const dispatch = useDispatch();
//   const { t } = useTranslation();
//   // const navigate = useNavigate();
//   useEffect(() => {
//     if (loading) {
//       dispatch(loadingFunc(t));
//     } else if (error) {
//       // if(error instanceof TokenExpiredError) navigate("/");
//       dispatch(errorFunc(error, t));
//     } else if (res) {
//       dispatch(afterFunc(res, t));
//       // afterFunc(t, res)(dispatch);//少了prestate的方法
//     }
//   }, [res, error, loading])

//   return fetchData;
// }