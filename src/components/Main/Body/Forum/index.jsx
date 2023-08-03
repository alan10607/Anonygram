import { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setAllId, setArticle } from 'redux/actions/forum';
import { replySetOpen } from 'redux/actions/reply';
import { CONT_STATUS_TYPE, REPLY_BOX } from 'util/constant';
import forumRequest from 'service/request/forumRequest';
import Article from './Article';
import Content from './Content';
import ContDel from './Content/ContDel';
import Reply from './Reply';
import Move from './Move';
import './index.scss';

export default function Forum() {
  const { forum, replyIsOpen } = useSelector(state => ({
    forum: state.forum,
    replyIsOpen: state.reply.isOpen
  }), shallowEqual);
  const dispatch = useDispatch();
  const idList = useMemo(() => [...forum.keys()], [id]);
  const querySize = 10;
  const queryPendingId = useRef(new Set());

  /* --- Loading id & article --- */
  useEffect(() => {
    if (idList.length === 0) {
      forumRequest.getId().then(res => {
        dispatch(setAllId(res.idList));
      }).catch((e) => {
        dispatch(showConsole(i18next.t("findIdSet-err")));
      });
    }
  }, [])

  useEffect(() => {//dynamic loading article
    queryArticle();

    window.addEventListener("scroll", scrollDownQuery);
    return () => {
      window.removeEventListener("scroll", scrollDownQuery);
    }
  }, [idList, queryPendingId])


  const scrollDownQuery = (event) => {
    queryArticle();
  }

  const queryArticle = () => {
    if (!canQueryArticle()) return;

    const queryIdList = getQueryIdList();
    queryIdList.forEach(id => queryPendingId.add(id));
    queryIdList.forEach(id => httpGetArticle(id));
  }

  const canQueryArticle = () => {
    if (!checkInBottom()) {
      return false;
    }

    if (getQueryIdList().length === 0) {
      console.log("Already query all articles, skip query");
      return false;
    }

    if (queryPendingId.current.size > 0) {
      console.log("Skip query articles because have pending query");
      return false;
    }

    return true;
  }

  const checkInBottom = () => {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    return clientHeight + scrollTop + 100 > scrollHeight;
  }

  const getQueryIdList = () => {
    return idList.filter(id => !forum.get(id)).slice(0, querySize);
  }

  const httpGetArticle = () => {
    forumRequest.getArticle(id).then(article => {
      dispatch(setArticle(article));
    }).catch((e) => {
      dispatch(showConsole(i18next.t("findPost-err")));
    }).finally(() => {
      queryPendingId.delete(id);
      console.log("Query article finishe", id);
    });
  }


  /* --- Close reply box --- */
  useEffect(() => {
    window.addEventListener("click", clickReply);
    return () => {
      window.removeEventListener("click", clickReply);
    }
  }, [])

  const clickReply = (event) => {
    if (replyIsOpen && !event.target.closest(`[${REPLY_BOX}]`)) {
      dispatch(replySetOpen(false));
    }
  }


  /* --- Create view --- */
  const getAllArticles = () => {
    const allArticle = [];
    for (let [id, article] of post) {
      if (!article) continue;//未讀取, 就跳過

      allArticle.push(
        <div key={id} id={id} className="art">
          <Article id={id} />
          <Fragment>{getAllContents(article.contList)}</Fragment>
          <Move id={id} />
          {id === replyId && <Reply id={id} />}
        </div>
      );
    }
    return allArticle;
  }

  const getAllContents = (contList) => {
    const allContent = [];
    for (let i = 1; i < contList.length; ++i) {
      const content = contList[i];
      if (!content) continue;//未讀取, 就跳過

      const key = `${content.id}_${content.no}`;
      allContent.push(
        content.status === CONT_STATUS_TYPE.DELETED ?
          <ContDel key={key} id={content.id} no={content.no} /> :
          <Content key={key} id={content.id} no={content.no} />
      );
    }
    return allContent;
  }

  return (
    <div>
      {getAllArticles()}
    </div>
  )
}