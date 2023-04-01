import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createPost } from '../../../redux/actions/post';
import { getNowTime } from '../../../utli/time';
import { getContentWord, pasteAsPlain } from '../../../utli/inputControll';
import { ICON_USER, ICON_UPLOAD_IMG, BIG_BOX_ID } from '../../../utli/constant';
import useConsole from '../../../utli/useConsole';
import useUploadImg from '../../../utli/useUploadImg';
import useJwt from '../../../utli/useJwt';
import Bigbox from '../BigBox';
import './index.css';

export default function New() {
  const [html, setHtml] = useState("");
  const inputRef = useRef();
  const inputTitleRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showConsole = useConsole();
  const [uploadImg, newHtml] = useUploadImg("new", inputRef);
  const { payload : { sub : username } } = useJwt();

  useEffect(() => {//上傳圖片後更新html
    setHtml(newHtml);
  }, [newHtml])

  const doCreatePost = () => {
    const title = inputTitleRef.current.value.trim();
    if (title == "") return showConsole(t("empty-title"));

    const word = getContentWord(inputRef.current);
    if (word.trim() == "") return showConsole(t("empty-word"));

    dispatch(createPost({ title, word }));
  }

  const boxRender = () => (
    <div id="new">
      <div className="bar">
        <img className="bar-head" src={ICON_USER} />
        <div className="author">{username}</div>
        <div className="time">{getNowTime()}</div>
      </div>
      <input ref={inputTitleRef} className="new-title" type="text" placeholder={t("title")} />
      <div
        ref={inputRef}
        className="new-input"
        onPaste={pasteAsPlain}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <div className="new-move">
        <label className="new-img">
          <img src={ICON_UPLOAD_IMG} />
          <input type="file" accept="image/*" onChange={uploadImg} />
        </label>
        <div className="flex-empty"></div>
      </div>
    </div>
  )

  return (
    <Bigbox
      bigBoxId={BIG_BOX_ID.NEW}
      title={t("add-post")}
      btnRender={() => <div onClick={doCreatePost}>{t("submit")}</div>}
      boxRender={boxRender}
    />
  )

}