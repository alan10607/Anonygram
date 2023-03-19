import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import useShowConsole from '../../../utli/useShowConsole';
import useUploadImg from '../../../utli/useUploadImg';
import getNowTime from '../../../utli/getNowTime';
import { getContentWord, pasteAsPlain } from '../../../utli/InputControll';
import { createPost } from '../../../redux/actions/post';
import { ICON_USER, ICON_CLOSE, ICON_UPLOAD_IMG } from '../../../utli/constant';

export default function New() {
  const [html, setHtml] = useState("");
  const inputRef = useRef();
  const inputTitleRef = useRef();
  const showConsole = useShowConsole();
  const [uploadImg, newHtml] = useUploadImg(inputRef);
  const dispatch = useDispatch();

  useEffect(() => {//上傳圖片後更新html
    setHtml(newHtml);
  }, [newHtml])
  
  const doCreatePost = () => {
    const title = inputTitleRef.current.value.trim();
    if (title == "") {
      showConsole("文章標題不能為空白!!");
      return;
    }
    const word = getContentWord(inputRef);
    if (word.trim() == "") {
      showConsole("留言內容不能為空白!!");
      return;
    }

    const data = { title, word };
    dispatch(createPost(data));
  }

  return (
    <div id="new">
      <TopBar title="發文" render={() => <div onClick={doCreatePost}>送出</div>}/>
      <div className="bar">
        <img className="bar-head" src={ICON_USER} />
        <div className="author" text="'匿名 (' + ${userId} + ')'"></div>
        <div>{getNowTime()}</div>
      </div>
      <input ref={inputTitleRef} className="new-title" type="text" placeholder="標題" />
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