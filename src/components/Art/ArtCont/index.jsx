import React from 'react'
import { useSelector } from 'react-redux';
import Word from '../Word';
import './index.css';
import useToggleLike from '../../../utli/useToggleLike';
import getTimeFromStr from '../../../utli/getTImeFromStr';
import { ICON_LIKE } from '../../../utli/constant';

export default function ArtCont({ id, no = 0 }) {
  const { art : { title }, cont : { word, isUserLike, likes, createDate } } = useSelector(state => ({
    art : state.post.get(id),
    cont : state.post.get(id).contList[no]
  }));
  const toggleLike = useToggleLike();

  const getLikeStr = () => {
    if (!isUserLike) return `${likes}人說讚`;
    if (likes - 1 == 0) return "你說讚";
    return `你與${likes - 1}人都說讚`
  }

  return (
    <div id={`${id}-${no}`} className="art-cont">
      <div className="title">{title}</div>
      <Word id={id} word={word} />
      <div className="info">
        <img className={"likes-icon " + (isUserLike ? "likes-icon-yes" : "")} src={ICON_LIKE} onClick={toggleLike(id, no, isUserLike)} />
        <div>{getLikeStr()}, {getTimeFromStr(createDate)}</div>
      </div>
    </div>
  )
}