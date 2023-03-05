import React, { Component } from 'react'
import { ICON_USER, ICON_LIKE } from '../../../constant';
import './index.css';

export class Cont extends Component {
  render() {
    const {authorName, likes, word, no, time} = this.props;
    return (
      <div>
        <div className="bar-in">
          <img className="bar-in-head" src={ICON_USER}/>
          <div className="author">{authorName}</div>
          <img className="likes-icon" src={ICON_LIKE} onclick="toggleLike(this);"/>
          <div className="likes likes-in">{likes}</div>
        </div>
        <div className="word">{word}</div>
        <div className="info">B{no}, {time}</div>
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
