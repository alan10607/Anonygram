import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deletePost } from '../../../../redux/actions/post';
import { getTimeFromStr } from '../../../../utli/time';
import { ICON_USER, ICON_LIKE } from '../../../../utli/constant';
import useToggleLike from '../../../../utli/useToggleLike';
import Word from '../Word';
import './index.scss';

export default function ArtCont({ id, no = 0 }) {
  const { art: { title }, cont: { author, authorName, word, isUserLike, likes, createDate }, userId, username } = useSelector(state => ({
    art: state.post.get(id),
    cont: state.post.get(id).contList[no],
    userId: state.user.userId,
    username: state.user.username
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleLike = useToggleLike();
  const canDel = userId.toString() == author || (userId == -1 && username == author);

  const getLikeStr = () => {
    if (likes == 0) return t("like-one", { likes });
    if (likes == 1) return isUserLike ? t("like-you") : t("like-one", { likes });
    return isUserLike ? t("like-you-cnt", { likes }) : t("like-cnt", { likes });
  }

  return (
    <div id={`${id}_${no}`} className="art-cont">
      <div className="bar-art">
        <img className="bar-head icon" src={ICON_USER} />
        <div className="author">{authorName}</div>
      </div>
      <div className="title">{title}</div>
      <Word id={id} word={word} />
      <div className="info">
        <img className={"likes-icon " + (isUserLike ? "likes-icon-yes" : "")}
          src={ICON_LIKE} onClick={toggleLike(id, no, isUserLike)} />
        <div>{getLikeStr()}, {getTimeFromStr(createDate)}</div>
        {canDel && <div className="del" onClick={() => { dispatch(deletePost({ id, no })) }}>{t("del")}</div>}
      </div>
    </div>
  )
}