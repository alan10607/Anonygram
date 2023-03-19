import React from 'react'
import { useSelector } from 'react-redux';
import Word from '../Word';
import './index.css';
import useToggleLike from '../../../utli/useToggleLike';
import getTimeFromStr from '../../../utli/getTImeFromStr';
import { ICON_USER, ICON_LIKE } from '../../../utli/constant';

export default function Cont({ id, no }) {
  const { cont : { authorName, isUserLike, likes, word, createDate } } = useSelector(state => ({
    cont : state.post.get(id).contList[no]
  }));
  const toggleLike = useToggleLike();

  return (
    <div id={`${id}_${no}`} className="cont">
      <div className="bar">
        <img className="bar-head" src={ICON_USER} />
        <div className="author">{authorName}</div>
        <img className={"likes-icon " + (isUserLike ? "likes-icon-yes" : "")} src={ICON_LIKE} onClick={toggleLike(id, no, isUserLike)} />
        <div className="likes-num">{likes}</div>
      </div>
      <Word id={id} word={word} />
      <div className="info">B{no} ,  {getTimeFromStr(createDate)}</div>
    </div>
  )
}