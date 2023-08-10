import { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setAllArticles, setAllId, setArticle } from 'redux/actions/forum';
import { STATUS_TYPE, REPLY_BOX } from 'util/constant';
import forumRequest from 'service/request/forumRequest';
import Article from 'components/Main/Body/Forum/Article';
import './forum.scss';
import { setConsole, setReplyId } from 'redux/actions/common';
import { useTranslation } from 'react-i18next';

export default function Forum() {
  const { forum } = useSelector(state => ({
    forum: state.forum
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const idList = useMemo(() => [...forum.keys()], [forum]);
  const querySize = 10;
  const queryIdList = useMemo(() => {console.log("AAAA"); return idList.filter(id => !forum.get(id)).slice(0, querySize)}, [idList, forum]);
  const queryLock = useRef(false);

  /* --- Loading id & article --- */
  useEffect(() => {
    if (idList.length === 0) {
      forumRequest.getId().then(res => {
        dispatch(setAllId(res));
      }).catch((e) => {
        dispatch(setConsole(t("findIdSet-err")));
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
      dispatch(setAllArticles(articles));
    }).catch((e) => {
      dispatch(setConsole(t("findPost-err")));
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
    if (!event.target.closest(`[${REPLY_BOX}]`)) {
      dispatch(setReplyId(""));
    }
  }


  /* --- Create view --- */
  const getArticleNode = () => {
    console.log("getAllArticles")
    const allArticle = [];
    for (let [id, article] of forum) {
      if (!article) continue;//not load yet
      if (article.status !== STATUS_TYPE.NORMAL) continue;

      allArticle.push(
        <Article key={id} id={id} />
      );
    }
    return allArticle;
  }

  return (
    <div>
      <div>2{idList.filter(id => forum.get(id)).length}</div>
      <Fragment>{getArticleNode()}</Fragment>
    </div>
  )
}