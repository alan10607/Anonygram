import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArtCont from './ArtCont';
import Bar from './Bar';
import Cont from './Cont';
import ContDel from './Cont/ContDel';
import Reply from './Reply';
import Move from './Move';
import './index.css';
import { findIdSet, findPost } from '../../redux/actions/post';
import { CONT_STATUS_TYPE } from '../../constant';
import useFindPost from '../../hooks/useFindPost';

export default function Art (){
  const [replyId, setReplyId] = useState("");
  const findPostLock = useRef(false);
  const findPostSize = 10;
  const {post, idList, findIdStart} = useSelector(state => ({
    post : state.post,
    idList : state.console.idList,
    findIdStart : state.console.idStart
  }));
  const dispatch = useDispatch();

  const doFindIdSet = () => {
    dispatch(findIdSet());
  }
  const doFindPost = () => {
      console.log("Loading posts from index", findIdStart);
    const data = {
      idList : idList.slice(findIdStart, findIdStart + findPostSize)
    }
    dispatch(findPost(data));
  }

  const checkInBottom = () => {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    return clientHeight + scrollTop + 100 > scrollHeight;
  }

  const openReply = (id) => {
    return () => {
      setReplyId(id);
    }
  }

  /* --- EventListener --- */
  const scrollDown = (event) => {
    if(findPostLock.current){
      console.log("findPostLock=true, skip find art");
      return;
    }

    if(findIdStart == idList.length){
      console.log("Already find all arts, skip find art");
      return;
    }

    if(checkInBottom()){
      findPostLock.current = true;
      doFindPost();
    }
  }

  useEffect(() => {
    doFindIdSet();
  }, [])

  useEffect(() => {
    if(idList.length > 0 && findIdStart < idList.length && checkInBottom()){
      doFindPost();//初始化時載入, 有空位也載入
    }else{
      findPostLock.current = false;
      console.log("Load posts done");
    }

    window.addEventListener("scroll", scrollDown);

    return () => {
      window.removeEventListener("scroll", scrollDown);
    }
  }, [idList, findIdStart])




  /* --- 頁面生成 --- */
  const createArt = () => {
    const allPost = [];
    for(let [id, a] of post) {
      if(!a) continue;//未讀取, 就跳過

      allPost.push(
        <div key={id} id={id} className="art">
          <Bar id={id}/>
          <ArtCont id={id}/>
          {createCont(a.contList)}
          <Move id={id} openReply={openReply(id)}/>
          {/* <Reply id={id} isOpen={id == replyId}/> */}
        </div>
      );
    }

    return allPost;
  }

  const createCont = (contList) => {
    const allCont = [];
    for(let i=1; i<contList.length; ++i){
      const c = contList[i];
      allCont.push(
        c.status == CONT_STATUS_TYPE.DELETED ?
        <ContDel key={`${c.id}-${c.no}`} id={c.id} no={c.no}/> :
        <Cont key={`${c.id}-${c.no}`} id={c.id} no={c.no}/>
      ); 
    }
    return allCont;
  }

  return (
    <div>
      {createArt()}
    </div>
  )
}
