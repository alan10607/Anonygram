import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Word from '../Word';
import './index.css';
import { ICON_USER, ICON_LIKE } from '../../../constant';
import getTimeFromStr from '../../../utli/getTImeFromStr';
import { likeContent, unlikeContent } from '../../../redux/actions/post';

export default function Cont ({id, no}) {
  const dispatch = useDispatch();
  const {cont : {authorName, isUserLike, likes, word, createDate}} = useSelector(state => ({
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

  return (
    <div id={`${id}-${no}`} className="cont">
      <div className="bar">
        <img className="bar-head" src={ICON_USER}/>
        <div className="author">{authorName}</div>
        <img className={"likes-icon " + (isUserLike ? "likes-icon-yes" : "")} src={ICON_LIKE} onClick={toggleLike(id, no, isUserLike)}/>
        <div className="likes-num">{likes}</div>
      </div>
      <Word id={id} word={word}/>
      <div className="info">B{no}, {getTimeFromStr(createDate)}</div>
    </div>
  )
}