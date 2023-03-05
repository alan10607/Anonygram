import React, { Component } from 'react'
import Word from '../Word';
import { ICON_LIKE } from '../../../constant';
import './index.css';

export default class ArtCont extends Component {
  getLikeStr = (isUserLike, likes) => {
    if(!isUserLike) return `${likes}人說讚`;
    if(likes - 1 == 0) return "你說讚";
    return `你與${likes - 1}人都說讚`
  }

  render() {
    const {title, word, isUserLike, likes, time} = this.props;
    return (
      <div className="cont">
        <div className="title">{title}</div>
        <Word word={word}/>
        <div className="info">
          <img className={"likes-icon " + (isUserLike ? "likes-icon-yes" : "")} src={ICON_LIKE} onClick="toggleLike(this);"/>
          <div>{this.getLikeStr(isUserLike, likes)}, {time}</div>
        </div>
      </div>
    )
  }
}