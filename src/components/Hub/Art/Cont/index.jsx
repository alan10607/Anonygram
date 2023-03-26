import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteCont } from '../../../../redux/actions/post';
import { getTimeFromStr } from '../../../../utli/time';
import { ICON_USER, ICON_LIKE } from '../../../../utli/constant';
import useToggleLike from '../../../../utli/useToggleLike';
import Word from '../Word';
import './index.css';

export default function Cont({ id, no }) {
  const { cont : { authorName, isUserLike, likes, word, createDate } } = useSelector(state => ({
    cont : state.post.get(id).contList[no]
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
      <div className="info">
        <div>B{no} ,  {getTimeFromStr(createDate)}</div>
        <div className="del" onClick={() => { dispatch(deleteCont({ id, no })) }}>{t("del")}</div>
      </div>
    </div>
  )
}