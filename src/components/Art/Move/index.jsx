import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { findTopCont } from '../../../redux/actions/post';

export default function Move({ id, openReply }) {
  const dispatch = useDispatch();
  const { contNum, startNo } = useSelector(state => ({
    contNum : state.post.get(id).contNum,
    startNo : state.post.get(id).contList.length
  }));

  const doFindTopCont = () => {
    if (startNo == contNum) return;

    const data = {
      id,
      no : startNo
    }
    dispatch(findTopCont(data));
  }

  const getOpenStr = (contNum, startNo) => {
    const remain = contNum - startNo;
    if (contNum == 1) return "該文章尚無留言";//只有本文
    if (remain == 0) return "";//已展開全部留言
    if (startNo == 1) return `查看全部${remain}則留言`;//尚未展開
    return `查看剩餘${remain}則留言`;
  }

  return (
    <div className="move">
      <div className="open" onClick={doFindTopCont}>{getOpenStr(contNum, startNo)}</div>
      <div className={"reply-btn " + (contNum == 1 || startNo > 1 ? "" : "disable")} onClick={openReply}>新增留言</div>
    </div>
  )
}