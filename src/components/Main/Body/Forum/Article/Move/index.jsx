import { useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { replySetId, replySetOpen } from 'redux/actions/reply';
import { REPLY_BOX_ATTR } from 'util/constant';
import useThrottle from 'util/useThrottle';
import './index.scss';
import forumRequest from 'service/request/forumRequest';
import { setAllContent } from 'redux/actions/forum';
import i18next from "i18next";
import { showConsole } from 'redux/actions/common';

export default function Move({ id }) {
  const { contNum, contList } = useSelector(state => ({
    contNum: state.forum.get(id).contNum,
    contList: state.forum.get(id).contList
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const firstNotNull = contList.findIndex(cont => !cont);
  const start = firstNotNull === -1 ? contList.length : firstNotNull;

  const noList = useMemo(() => [...Array(contNum).keys()], [contNum]);
  const querySize = 10;
  const emptyNoList = useMemo(() => noList.filter(no => !contList[no]), [noList]);
  const queryNoList = useMemo(() => noList.filter(no => !contList[no]).slice(0, querySize), [noList]);

  const getOpenStr = () => {
    if (contNum === 1) return t("open-none");//只有本文
    if (queryNoList === 0) return "";//已展開全部留言
    if (queryNoList[0] === 1) return t("open-all", { remain: emptyNoList.length });//尚未展開
    return t("open-remain", { remain: emptyNoList.length });//展開剩餘
  }

  const doFindTopCont = useThrottle(() => {
    forumRequest.getContents(id, noList).then((contents) => {
      dispatch(setAllContent(contents));
    }).catch((e) => {
      dispatch(showConsole(i18next.t("findTopCont-err")));
    });
  })

  const openReply = () => {
    dispatch(replySetId(id));
    dispatch(replySetOpen(true));
  }

  const getOpenNode = () => {
    if (contNum === 1) {//only one content
      return (
        <div className={"open open-disable"} onClick={doFindTopCont}>
          {t("open-none")}
        </div>
      )
    }
    
    if (queryNoList === 0) return "";//已展開全部留言
    if (queryNoList[0] === 1) return t("open-all", { remain: emptyNoList.length });//尚未展開
    return t("open-remain", { remain: emptyNoList.length });//展開剩餘
  }

  return (
    <div className="move">
      <div className={"open " + (contNum === 1 ? "not-open" : "")} onClick={doFindTopCont}>
        {getOpenStr(contNum, start)}
      </div>
      <div className="flex-empty"></div>
      <div className="reply-btn" onClick={openReply} {...REPLY_BOX_ATTR}>{t("add-cont")}</div>
    </div>
  )
}