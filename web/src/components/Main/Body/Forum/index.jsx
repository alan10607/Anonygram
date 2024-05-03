import { REPLY_BOX, STATUS_TYPE } from 'config/constant';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setArticleIds, setConsole, setReplyId } from 'redux/actions/common';
import { setDiscussions } from 'redux/actions/discussions';
import discussionRequest from 'service/request/discussionRequest';
import queryRequest from 'service/request/queryRequest';
import Discussion from './Discussion';
import './Forum.scss';

export default function Forum() {
  const { idList, discussions } = useSelector(state => ({
    idList: state.common.articleIds,
    discussions: state.discussions
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const querySize = 10;
  const queryIdList = useMemo(() => idList.filter(id => !discussions[id]).slice(0, querySize), [idList, discussions]);
  const queryLock = useRef(false);

  /* --- Loading id --- */
  useEffect(() => {
    if (idList.length === 0) {//init idList
      queryRequest.getArticleIds()
        .then(articleIds => {
          if (articleIds.length > 0) {
            dispatch(setArticleIds(articleIds))
          } else {
            console.log("No article exist")
          }
        })
        .catch(e => dispatch(setConsole(t("tip.forum.id.error"))));
    }
  }, [idList])

  useEffect(() => {
    queryLock.current = false;//redux state update means that query finished
  }, [queryIdList])

  useEffect(() => {//dynamic loading discussions
    queryDiscussion();

    window.addEventListener("scroll", scrollDownQuery);
    return () => {
      window.removeEventListener("scroll", scrollDownQuery);
    }
  }, [queryIdList, queryLock])


  const scrollDownQuery = (event) => {
    queryDiscussion();
  }

  const queryDiscussion = () => {
    if (!canQueryDiscussion()) return;

    queryLock.current = true;

    discussionRequest.getMulti(queryIdList)
      .then(discussions => dispatch(setDiscussions(discussions)))
      .catch(e => {
        dispatch(setConsole(t("tip.forum.article.get.error")));
        queryLock.current = false;
      })
  }

  const canQueryDiscussion = () => {
    if (!checkInBottom()) {
      return false;
    }

    if (queryIdList.length === 0) {
      console.log("Already query all discussions, skip query");
      return false;
    }

    if (queryLock.current) {
      console.log("Skip query discussions because query locked");
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
  const getDiscussionNodes = () => {
    console.log(`Discussion loaded: ${idList.filter(id => discussions[id]).length} / ${idList.length}`);
    const nodes = [];
    for (const id of idList) {
      if (!discussions[id]) continue;//not load yet
      if (discussions[id].status !== STATUS_TYPE.NORMAL) continue;

      nodes.push(<Discussion key={id} discussion={discussions[id]} />);
    }
    return nodes;
  }

  return (
    <div id="forum">
      <Fragment>{getDiscussionNodes()}</Fragment>
    </div>
  )
}