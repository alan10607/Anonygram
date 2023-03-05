import React, { Component } from 'react'
import { ICON_USER, ICON_UPLOAD_IMG } from '../../../constant';
import './index.css';

export class Reply extends Component {
  render() {
    const {userName, no, time} = this.props;
    return (
    <div class="reply-box">
      <div class="bar">
        <img class="bar-head" src={ICON_USER}/>
        <span className="author">{userName}</span>
      </div>
      <div className="info">B{no}, {time}</div>
      <div class="reply-textarea" contenteditable="true" onpaste="pasteAsPlain(event);"></div>
      <div class="move">
        <label class="reply-img">
          <img src={ICON_UPLOAD_IMG}/>
          <input type="file" accept="image/*" onchange="replyImg(this);"/>
        </label>
        <div class="flex-empty"></div>
        <div class="reply-summit" onclick="replyPost(this);">送出</div>
      </div>
    </div>
    )
  }
}

export class ContDelete extends Component {
  render() {
    const {no} = this.props;
    return (
      <div>
        <div className="bar-in">
          <img className="bar-in-head" src={ICON_USER}/>
          <div className="author">這則留言已被本人刪除</div>
        </div>
        <div className="word">已經刪除的內容就像青春一樣回不去了</div>
        <div className="info">B{no}, 已刪除</div>
      </div>
    )
  }
}
