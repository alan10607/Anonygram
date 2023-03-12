import React from 'react'
import Word from '../Word';
import './index.css';
import { ICON_LIKE } from '../../../constant';
import { useSelector, useDispatch } from 'react-redux';
import { likeContent, unlikeContent } from '../../../redux/actions/post';
import getTimeFromStr from '../../../utli/getTImeFromStr';

export default function ArtCont ({id, no = 0}) {
  const dispatch = useDispatch();
  const {art : {title}, cont : {word, isUserLike, likes, createDate}} = useSelector(state => ({
    art : state.post.get(id),
    cont : state.post.get(id).contList[no]
  }));

  const toggleLike = (id, no, isUserLike) => {
    return () => {
      const data = {id, no};
      if(isUserLike){
        dispatch(unlikeContent(data));
      }else{
        dispatch(likeContent(data));
      }
    }
  }

  const getLikeStr = (isUserLike, likes) => {
    if(!isUserLike) return `${likes}人說讚`;
    if(likes - 1 == 0) return "你說讚";
    return `你與${likes - 1}人都說讚`
  }

  return (
    <div id={`${id}-${no}`} className="art-cont">
      <div className="title">{title}</div>
      <Word id={id} word={word}/>
      <div className="info">
        <img className={"likes-icon " + (isUserLike ? "likes-icon-yes" : "")} src={ICON_LIKE} onClick={toggleLike(id, no, isUserLike)}/>
        <div>{getLikeStr(isUserLike, likes)}, {getTimeFromStr(createDate)}</div>
      </div>
    </div>
  )
}