import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createPost } from '../../../../redux/actions/post';
import { getNowTime } from '../../../../utli/time';
import { getContentWord, pasteAsPlain } from '../../../../utli/inputControll';
import { ICON_USER, ICON_UPLOAD_IMG } from '../../../../utli/constant';
import useConsole from '../../../../utli/useConsole';
import useUploadImg from '../../../../utli/useUploadImg';
import TopBar from './TopBar';
import './index.css';

export default function New() {
  const [html, setHtml] = useState("");
  const inputRef = useRef();
  const inputTitleRef = useRef();
  const { username } = useSelector(state => ({
    username : state.user.username
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showConsole = useConsole();
  const [uploadImg, newHtml] = useUploadImg(inputRef);

  useEffect(() => {//上傳圖片後更新html
    setHtml(newHtml);
  }, [newHtml])
  
  const doCreatePost = () => {
    const title = inputTitleRef.current.value.trim();
    if (title == "") {
      showConsole(t("empty-title"));
      return;
    }
    const word = getContentWord(inputRef);
    if (word.trim() == "") {
      showConsole(t("empty-word"));
      return;
    }

    const data = { title, word };
    dispatch(createPost(data));
  }

  return (
    <div id="new">
      <TopBar title={t("add-post")} render={() => <div onClick={doCreatePost}>{t("submit")}</div>}/>
      <div className="bar">
        <img className="bar-head" src={ICON_USER} />
        <div className="author">{username}</div>
        <div>{getNowTime()}</div>
      </div>
      <input ref={inputTitleRef} className="new-title" type="text" placeholder={t("title")} />
      <div 
        ref={inputRef}
        className="new-input"
        onPaste={pasteAsPlain}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html : html }}
      ></div>
      <div className="bar">
        <label className="new-img">
          <img src={ICON_UPLOAD_IMG} />
          <input type="file" accept="image/*" onChange={uploadImg}/>
        </label>
        <div className="flex-empty"></div>
      </div>
    </div>
  )

}