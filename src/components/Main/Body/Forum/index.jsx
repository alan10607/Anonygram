import { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setAllArticle, setAllId, setArticle } from 'redux/actions/forum';
import { replySetOpen } from 'redux/actions/reply';
import { STATUS_TYPE, REPLY_BOX } from 'util/constant';
import forumRequest from 'service/request/forumRequest';
import Article from './Article';
import Content from './Content';
import ContDel from './Content/ContDel';
import Reply from './Reply';
import Move from './Move';
import './index.scss';
import { showConsole } from 'redux/actions/common';
import i18next from "i18next";

export default function Forum() {
  const { forum, replyIsOpen } = useSelector(state => ({
    forum: state.forum,
    replyIsOpen: state.reply.isOpen
  }), shallowEqual);
  const dispatch = useDispatch();
  const idList = useMemo(() => [...forum.keys()], [forum]);
  const querySize = 10;
  const queryIdList = useMemo(() => idList.filter(id => !forum.get(id)).slice(0, querySize), [idList]);
  const queryLock = useRef(false);

  /* --- Loading id & article --- */
  useEffect(() => {
    if (idList.length === 0) {
      forumRequest.getId().then(res => {
        dispatch(setAllId(res));
      }).catch((e) => {
        dispatch(showConsole(i18next.t("findIdSet-err")));
      });
    }
  }, [])

  useEffect(() => {
    queryLock.current = false;
  }, [queryIdList])

  useEffect(() => {//dynamic loading article
    queryArticle();

    window.addEventListener("scroll", scrollDownQuery);
    return () => {
      window.removeEventListener("scroll", scrollDownQuery);
    }
  }, [queryIdList, queryLock])


  const scrollDownQuery = (event) => {
    queryArticle();
  }

  const queryArticle = () => {
    if (!canQueryArticle()) return;

    queryLock.current = true;

    forumRequest.getArticles(queryIdList).then(articles => {
      dispatch(setAllArticle(articles));
    }).catch((e) => {
      dispatch(showConsole(i18next.t("findPost-err")));
      queryLock.current = false;
    })
  }

  const canQueryArticle = () => {
    if (!checkInBottom()) {
      return false;
    }

    if (queryIdList.length === 0) {
      console.log("Already query all articles, skip query");
      return false;
    }

    if (queryLock.current) {
      console.log("Skip query articles because query locked");
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
    for (let [id, article] of forum) {
      if (!article) continue;//not load yet
      if (article.status !== STATUS_TYPE.NORMAL) continue;

      allArticle.push(
        <div key={id} id={id} className="art">
          <Article id={id} />
          <Fragment>{getAllContents(article.contList)}</Fragment>
          <Move id={id} />
          {/* <Reply id={id} /> */}
        </div>
      );
    }
    return allArticle;
  }

  const getAllContents = (contList) => {
    const allContent = [];
    for (let i = 1; i < contList.length; ++i) {
      const content = contList[i];
      if (!content) continue;//not load yet
      const key = `${content.id}_${content.no}`;
      let node = null;
      if (content.status === STATUS_TYPE.NORMAL) {
        node = <ContDel key={key} id={content.id} no={content.no} />
      } else if (content.status === STATUS_TYPE.DELETED) {
        node = <ContDel key={key} id={content.id} no={content.no} />
      }
      allContent.push(node);
    }
    return allContent;
  }

  return (
    <div>
      <div>2{idList.filter(id => forum.get(id)).length}</div>
      {getAllArticles()}
    </div>
  )
}