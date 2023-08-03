import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createPost } from '../../../redux/actions/post';
import { replySetTitle } from '../../../redux/actions/reply';
import { getNowTime } from '../../../util/time';
import { getContentWord } from '../../../util/inputControll';
import { ICON_USER, BIG_BOX_ID } from '../../../util/constant';
import useConsole from '../../../util/useConsole';
import useThrottle from '../../../util/useThrottle';
import Bigbox from '../BigBox';
import ReplyInput from '../Art/ReplyInput';
import './index.scss';

export default function New() {
  const id = "new";
  const titleRef = useRef();
  const inputRef = useRef();
  const { username, title } = useSelector(state => ({
    username: state.user.username,
    title: state.reply.title,
  }), shallowEqual);
  const dispatch = useDispatch();
  const showConsole = useConsole();
  const { t } = useTranslation();

  useEffect(() => {
    titleRef.current.value = title;
  }, [title])

  const doCreatePost = useThrottle(() => {
    if (title === "") return showConsole(t("empty-title"));

    const word = getContentWord(inputRef.current);
    if (word.trim() === "") return showConsole(t("empty-word"));

    dispatch(createPost({ title, word }));
  });

  const boxRender = () => (
    <div id="new">
      <div className="new-bar">
        <img className="new-head icon" src={ICON_USER} alt="ICON_USER" />
        <div className="new-author">{username}</div>
        <div className="flex-empty"></div>
        <div className="new-info">{getNowTime()}</div>
      </div>
      <input ref={titleRef} onBlur={(event) => { dispatch(replySetTitle(event.target.value)) }}
        className="new-title" type="text" placeholder={t("title")} />
      <div className="new-input-box">
        <ReplyInput id={id} inputRef={inputRef}/>
      </div>
    </div>
  )

  return (
    <Bigbox
      bigBoxId={BIG_BOX_ID.NEW}
      title={t("add-post")}
      btnRender={() => <div className="new-submit" onClick={doCreatePost}>{t("submit")}</div>}
      boxRender={boxRender}
    />
  )
}