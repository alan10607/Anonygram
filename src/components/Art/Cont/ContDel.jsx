import React from 'react';
import './index.css';
import { ICON_USER } from '../../../utli/constant';

export default function ContDel({ id, no }) {
  return (
    <div id={`${id}_${no}`} className="cont">
      <div className="bar">
        <img className="bar-head" src={ICON_USER} />
        <div className="author">這則留言已被本人刪除</div>
      </div>
      <div className="word">已經刪除的內容就像青春一樣回不去了</div>
      <div className="info">B{no} ,  已刪除</div>
    </div>
  )
}