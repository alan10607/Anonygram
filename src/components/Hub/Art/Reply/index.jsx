import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { replyPost } from '../../../../redux/actions/post';
import { getNowTime } from '../../../../utli/time';
import { getContentWord, pasteAsPlain } from '../../../../utli/inputControll';
import { ICON_USER, ICON_UPLOAD_IMG } from '../../../../utli/constant';
import useConsole from '../../../../utli/useConsole';
import useUploadImg from '../../../../utli/useUploadImg';
import './index.css';
import useJwt from '../../../../utli/useJwt';

export default function Reply({ id }) {
  const [html, setHtml] = useState("");
  const inputRef = useRef();
  const { contNum } = useSelector(state => ({
    contNum : state.post.get(id).contNum,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showConsole = useConsole();
  const [uploadImg, newHtml] = useUploadImg(id, inputRef);
  const { payload : { sub : username } } = useJwt();

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
        <img className="bar-head" src={ICON_USER} />
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
          <img src={ICON_UPLOAD_IMG} />
          <input type="file" accept="image/*" onChange={uploadImg}/>
        </label>
        <div className="flex-empty"></div>
        <div className="reply-summit" onClick={doReplyPost}>{t("submit")}</div>
      </div>
    </div>
  )
}