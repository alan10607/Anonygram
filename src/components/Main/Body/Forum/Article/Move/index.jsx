import { useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { REPLY_BOX_ATTR } from 'util/constant';
import useThrottle from 'util/useThrottle';
import './move.scss';
import forumRequest from 'service/request/forumRequest';
import { setAllContents } from 'redux/actions/forum';
import { setReplyId, setConsole } from 'redux/actions/common';

export default function Move({ id }) {
  const { contNum, contentList } = useSelector(state => ({
    contNum: state.forum.get(id).contNum,
    contentList: state.forum.get(id).contentList
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const noList = useMemo(() => [...Array(contNum).keys()], [contNum]);
  const querySize = 10;
  const emptyNoList = noList.filter(no => !contentList[no]);
  const queryNoList = emptyNoList.slice(0, querySize);

  const getContents = useThrottle(() => {
    forumRequest.getContents(id, queryNoList).then((contents) => {
      dispatch(setAllContents(contents));
    }).catch((e) => {
      dispatch(setConsole(t("findTopCont-err")));
    });
  })

  const openReply = () => {
    dispatch(setReplyId(id));
  }

  const getOpenNode = () => {
    if (contNum === 1) {//only one content
      return (
        <div className={"open open-disable"}>{t("open-none")}</div>
      )
    }

    if (queryNoList.length === 0) {//already open all
      return (
        <div className={"open open-disable"}></div>
      )
    }

    const remain = emptyNoList.length;
    if (queryNoList[0] === 1) {//not open any yet
      return (
        <div className={"open open-enable"} onClick={getContents}>{t("open-all", { remain })}</div>
      )
    }

    return (//open remain
      <div className={"open open-enable"} onClick={getContents}>{t("open-remain", { remain })}</div>
    )
  }

  return (
    <div className="move">
      {getOpenNode()}
      <div className="flex-empty"></div>
      <div className="word-btn" onClick={openReply} {...REPLY_BOX_ATTR}>{t("add-cont")}</div>
    </div>
  )
}