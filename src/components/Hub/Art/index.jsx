import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findIdSet, findPost } from '../../../redux/actions/post';
import { saveReplyId } from '../../../redux/actions/common';
import { saveUserData } from '../../../redux/actions/user';
import { CONT_STATUS_TYPE } from '../../../utli/constant';
import { getJwt, getJwtPayload, isJwtValid } from '../../../utli/jwt';
import ArtCont from './ArtCont';
import Bar from './Bar';
import Cont from './Cont';
import ContDel from './Cont/ContDel';
import Reply from './Reply';
import Move from './Move';
import './index.css';

export default function Art() {
  const findPostLock = useRef(false);
  const findPostSize = 10;
  const { post, idList, findIdStart, replyId } = useSelector(state => ({
    post : state.post,
    idList : state.common.idList,
    findIdStart : state.common.findIdStart,
    replyId : state.common.replyId
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* --- 初始化頁面 --- */
  useEffect(() => {
    const jwt = getJwt();
    if (!jwt) {
      console.log("Jwt not found, navigate to login...");
      navigate("/login");
      return;
    }

    const payload = getJwtPayload(jwt);
    const expStr = new Date(payload.exp * 1000).toLocaleString();
    if(!isJwtValid(payload.exp)){
      console.log(`Jwt was expired at ${expStr}, navigate to login...`);
      navigate("/login");
      return;
    }

    dispatch(saveUserData(payload));
    console.log("Load jwt payload", payload, );
    console.log(`Jwt will expire at ${expStr}`);

    if(idList.length === 0) {
      dispatch(findIdSet());
      console.log("Load id set");
    }

    // window.addEventListener("click", clickReply);
    return () => {
      // window.removeEventListener("click", clickReply);
    }
  }, [])

  /* --- 往下滑動找更多文章 --- */
  useEffect(() => {
    if (idList.length > 0 && findIdStart < idList.length && checkInBottom()) {
      doFindPost();//初始化時載入, 載入完後有仍有空位則繼續載入
    } else {
      findPostLock.current = false;
      console.log("Load posts done");
    }

    window.addEventListener("scroll", scrollDown);
    return () => {
      window.removeEventListener("scroll", scrollDown);
    }
  }, [idList, findIdStart])

  /* --- EventListener --- */
  const scrollDown = (event) => {
    if (findPostLock.current) {
      console.log("findPostLock=true, skip find art");
      return;
    }

    if (findIdStart == idList.length) {
      console.log("Already find all arts, skip find art");
      return;
    }

    if (checkInBottom()) {
      findPostLock.current = true;
      doFindPost();
    }
  }

  const clickReply = (event) => {
    if(!event.target.closest("[data-click-reply]")){
      dispatch(saveReplyId(""));
    }
  }

  /* --- 其他 --- */
  const doFindPost = () => {
    console.log("Load posts from index", findIdStart);
    dispatch(findPost({
      idList : idList.slice(findIdStart, findIdStart + findPostSize)
    }));
  }

  const checkInBottom = () => {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    return clientHeight + scrollTop + 100 > scrollHeight;
  }

  const openReply = (id) => {
    return () => {
      dispatch(saveReplyId(id));
    }
  }

  /* --- 頁面生成 --- */
  const createArt = () => {
    const allArt = [];
    for (let [id, a] of post) {
      if (!a) continue;//未讀取, 就跳過

      allArt.push(
        <div key={id} id={id} className="art">
          <Bar id={id} />
          <ArtCont id={id} />
          <div>{createCont(a.contList)}</div>
          <Move id={id} openReply={openReply(id)} />
          {id == replyId && <Reply id={id} />}
        </div>
      );
    }
    return allArt;
  }

  const createCont = (contList) => {
    const allCont = [];
    for (let i = 1; i < contList.length; ++i) {
      const c = contList[i];
      const k = `${c.id}_${c.no}`;
      allCont.push(
        c.status == CONT_STATUS_TYPE.DELETED ?
          <ContDel key={k} id={c.id} no={c.no} /> :
          <Cont key={k} id={c.id} no={c.no} />
      );
    }
    return allCont;
  }

  return (
    <div>
      <div className="empty-head"></div>
      {createArt()}
    </div>
  )
}