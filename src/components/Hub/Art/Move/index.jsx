import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { findTopCont } from '../../../../redux/actions/post';
import './index.css';

export default function Move({ id, openReply }) {
  const { contNum, startNo } = useSelector(state => ({
    contNum : state.post.get(id).contNum,
    startNo : state.post.get(id).contList.length
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const doFindTopCont = () => {
    if (startNo == contNum) return;
    dispatch(findTopCont({ id, no : startNo }));
  }

  const getOpenStr = (contNum, startNo) => {
    const remain = contNum - startNo;
    if (contNum == 1) return t("open-none");//只有本文
    if (remain == 0) return "";//已展開全部留言
    if (startNo == 1) return t("open-all", {remain});//尚未展開
    return t("open-remain", {remain});
  }

  return (
    <div className="move">
      <div className={"open " + (contNum > 1 ? "can-open" : "")}
        onClick={doFindTopCont}>{getOpenStr(contNum, startNo)}</div>
      <div className="flex-empty"></div>
      <div className={"reply-btn " + (contNum == 1 || startNo > 1 ? "" : "disable") } onClick={openReply} data-click-reply>{t("add-cont")}</div>
    </div>
  )
}