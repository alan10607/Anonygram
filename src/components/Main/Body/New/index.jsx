import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { replySetTitle } from 'redux/actions/reply';
import { getNowTime } from 'util/time';
import { getContentWord } from 'util/inputControll';
import { ICON_USER, BIG_BOX_ID } from 'util/constant';
import useConsole from 'util/useConsole';
import useThrottle from 'util/useThrottle';
import './index.scss';
import NewReply from '../Forum/Article/Reply/NewReply';
import ReplyBar from '../Forum/Article/Content/Bar/ReplyBar';
import NewInfo from '../Forum/Article/Content/Info/NewInfo';

export default function New() {
  const [title, setTitle] = useState("");
  const { username } = useSelector(state => ({
    username: state.user.username,
  }), shallowEqual);
  const dispatch = useDispatch();
  const showConsole = useConsole();
  const { t } = useTranslation();



  // const doCreatePost = useThrottle(() => {
  //   if (title === "") return showConsole(t("empty-title"));

  //   const word = getContentWord(inputRef.current);
  //   if (word.trim() === "") return showConsole(t("empty-word"));

  //   dispatch(createPost({ title, word }));
  // });



  return (
    <div id="new">
      <ReplyBar />
      <NewInfo />
      <input value={title}
        onChange={(event) => { setTitle(event.target.value) }}
        className="new-title"
        type="text"
        placeholder={t("title")} />
      <NewReply />
    </div>
  )
}