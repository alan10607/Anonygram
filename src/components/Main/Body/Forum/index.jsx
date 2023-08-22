import { Fragment, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setConsole, setReplyId } from 'redux/actions/common';
import { setArticles, setIds } from 'redux/actions/forum';
import { REPLY_BOX, STATUS_TYPE } from 'config/constant';
import forumRequest from 'service/request/forumRequest';
import Article from './Article';
import './Forum.scss';

export default function Forum() {
  const { forum } = useSelector(state => ({
    forum: state.forum
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const querySize = 10;
  const idList = useMemo(() => [...forum.keys()], [forum]);
  const queryIdList = useMemo(() => idList.filter(id => !forum.get(id)).slice(0, querySize), [idList, forum]);
  const queryLock = useRef(false);

  /* --- Loading id & article --- */
  useEffect(() => {
    if (forum.size === 0) {
      forumRequest.getId()
        .then(res => dispatch(setIds(res)))
        .catch(e => dispatch(setConsole(t("tip.forum.id.error"))));
    }
  }, [])

  useEffect(() => {
    queryLock.current = false;//redux state update means that query finished
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

    forumRequest.getArticle(queryIdList, [0])
      .then(articles => dispatch(setArticles(articles)))
      .catch(e => {
        dispatch(setConsole(t("tip.forum.article.get.error")));
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
    console.log(`Article loaded: ${idList.filter(id => forum.get(id)).length} / ${idList.length}`);
    const allArticle = [];
    for (const [id, article] of forum) {
      if (!article) continue;//not load yet
      if (article.status !== STATUS_TYPE.NORMAL) continue;

      allArticle.push(<Article key={id} id={id} />);
    }
    return allArticle;
  }

  return (
    <div>
      <Fragment>{getArticleNode()}</Fragment>
    </div>
  )
}