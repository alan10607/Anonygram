import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { replyPost } from '../../../../redux/actions/post';
import { getNowTime } from '../../../../utli/time';
import { getContentWord, pasteAsPlain } from '../../../../utli/inputControll';
import { ICON_USER, ICON_UPLOAD_IMG } from '../../../../utli/constant';
import useConsole from '../../../../utli/useConsole';
import useUploadImg from '../../../../utli/useUploadImg';
import './index.scss';

export default function Reply({ id }) {
  const [html, setHtml] = useState("");
  const inputRef = useRef();
  const { contNum, username } = useSelector(state => ({
    contNum : state.post.get(id).contNum,
    username : state.user.username
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showConsole = useConsole();
  const [uploadImg, newHtml] = useUploadImg(id, inputRef);

  useEffect(() => {//更新html為加入圖片後的
    setHtml(newHtml);
  }, [id, newHtml])
  
  const doReplyPost = () => {
    const word = getContentWord(inputRef.current);
    if (word.trim() == "") return showConsole(t("empty-word"));
    dispatch(replyPost({ id, word }));
  }
 
  return (
    <div className="reply replying" data-click-reply>
      <div className="bar">
        <img className="bar-head icon" src={ICON_USER} />
        <div className="author">{username}</div>
      </div>
      <div className="info">B{contNum}, {getNowTime()}</div>
      <div 
        ref={inputRef}
        className="reply-input"
        onPaste={pasteAsPlain}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <div className="move">
        <label className="reply-img">
          <img className="icon" src={ICON_UPLOAD_IMG} />
          <input type="file" accept="image/*" onChange={uploadImg}/>
        </label>
        <div className="flex-empty"></div>
        <div className="reply-summit" onClick={doReplyPost}>{t("submit")}</div>
      </div>
    </div>
  )
}