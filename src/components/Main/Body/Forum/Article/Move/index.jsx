import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setConsole, setReplyId } from 'redux/actions/common';
import { setAllContents } from 'redux/actions/forum';
import forumRequest from 'service/request/forumRequest';
import { REPLY_BOX_ATTR } from 'config/constant';
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

  const getContents = useThrottle(() => {
    forumRequest.getArticle([id], queryNoList)
      .then(contents => dispatch(setAllContents(contents)))
      .catch(e => dispatch(setConsole(t("tip.forum.content.get.error"))));
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
      return <div className={"open"} onClick={getContents}>{t("text.move.open.all", { remain })}</div>

    //open remain
    return <div className={"open"} onClick={getContents}>{t("text.move.open.remain", { remain })}</div>
  }

  return (
    <div className="move">
      {getOpenNode()}
      <div className="flex-empty"></div>
      <div className="text-btn" onClick={openReply} {...REPLY_BOX_ATTR}>{t("add-cont")}</div>
    </div>
  )
}