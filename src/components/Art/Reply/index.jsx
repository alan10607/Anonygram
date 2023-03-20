import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import useShowConsole from '../../../utli/useShowConsole';
import useShowLoading from '../../../utli/useShowLoading';
import useUploadImg from '../../../utli/useUploadImg';
import getNowTime from '../../../utli/getNowTime';
import { getContentWord, pasteAsPlain } from '../../../utli/inputControll';
import { replyPost, uploadImg } from '../../../redux/actions/post';
import { ICON_USER, ICON_UPLOAD_IMG } from '../../../utli/constant';

export default function Reply({ id, userName = "???" }) {
  const [html, setHtml] = useState("");
  const inputRef = useRef();
  const { contNum } = useSelector(state => ({
    contNum: state.post.get(id).contNum,
  }));
  const showConsole = useShowConsole();
  const [uploadImg, newHtml] = useUploadImg(id, inputRef);
  const dispatch = useDispatch();

  useEffect(() => {//更新html
    setHtml(newHtml);
  }, [id, newHtml])
  
  const doReplyPost = () => {
    const word = getContentWord(inputRef);
    if (word.trim() == "") {
      showConsole("留言內容不能為空白!!");
      return;
    }

    const data = { id, word };
    dispatch(replyPost(data));
  }

  return (
    <div className="reply replying">
      <div className="bar">
        <img className="bar-head" src={ICON_USER} />
        <div className="author">{userName}</div>
      </div>
      <div className="info">B{contNum} ,  {getNowTime()}</div>
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
        <div className="reply-summit" onClick={doReplyPost}>送出</div>
      </div>
    </div>
  )
}