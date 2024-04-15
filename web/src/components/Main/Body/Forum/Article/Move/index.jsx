import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setReplyId } from 'redux/actions/common';
import { setArticles } from 'redux/actions/forum';
import { REPLY_BOX_ATTR } from 'config/constant';
import forumRequest from 'service/request/forumRequest';
import useThrottle from 'util/useThrottle';
import './Move.scss';

export default function Move({ id }) {
  const { contentSize, contentList } = useSelector(state => ({
    contentSize: state.forum.get(id).contentSize,
    contentList: state.forum.get(id).contentList
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const noList = useMemo(() => [...Array(contentSize).keys()], [contentSize]);
  const querySize = 10;
  const emptyNoList = noList.filter(no => !contentList[no]);
  const queryNoList = emptyNoList.slice(0, querySize);

  const httpGetContent = useThrottle(() => {
    forumRequest.getArticle([id], queryNoList)
      .then(contents => dispatch(setArticles(contents)))
      .catch(e => console.log("Failed to get contents", e));
  })

  const openReply = () => {
    dispatch(setReplyId(id));
  }

  const getOpenNode = () => {
    if (contentSize === 1)//only one content
      return <div className={"open"} disabled>{t("text.move.open.none")}</div>

    if (queryNoList.length === 0)//already open all
      return <div className={"open"} disabled></div>

    const remain = emptyNoList.length;
    if (queryNoList[0] === 1)//not open any yet
      return <div className={"open"} onClick={httpGetContent}>{t("text.move.open.all", { remain })}</div>

    //open remain
    return <div className={"open"} onClick={httpGetContent}>{t("text.move.open.remain", { remain })}</div>
  }

  return (
    <div className="move">
      {getOpenNode()}
      <div className="flex-empty"></div>
      <div className="text-btn" onClick={openReply} {...REPLY_BOX_ATTR}>{t("common.reply")}</div>
    </div>
  )
}