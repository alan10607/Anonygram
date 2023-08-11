import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { replyFilter as inputFilter } from 'util/inputControll';
import { WELCOME_PAGE } from 'util/constant';
import useThrottle from 'util/useThrottle';
import './reply.scss';
import forumRequest from 'service/request/forumRequest';
import { deleteAllId } from 'redux/actions/forum';
import UploadImageBtn from './UploadImgBtn';
import { pasteAsPlain } from 'util/inputControll';
import { setReplyHtml, setConsole, setReplyId } from 'redux/actions/common';
import ReplyBar from '../Content/Bar/ReplyBar';
import NewInfo from '../Content/Info/NewInfo';
import { Link, useNavigate } from "react-router-dom";


export default function NewReply({ id = "new" }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef();
  const { replyHtml } = useSelector(state => ({
    replyHtml: state.common.replyHtml[id]
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setReplyId(id));
  }, [])

  const httpSetContent = useThrottle(() => {
    if (title.trim() === "") return dispatch(setConsole(t("empty-title")));
    if (title.length > 50) return dispatch(setConsole(t("too-many-title", { length: title.length })));
    const word = inputFilter(inputRef.current);
    if (word.trim() === "") return dispatch(setConsole(t("empty-word")));
    if (word.length > 3000) return dispatch(setConsole(t("too-many-word", { length: word.length })));

    forumRequest.setArticle(title, word).then((content) => {
      dispatch(deleteAllId());//reload forum page
      dispatch(setReplyHtml(id, "<div><br></div>"));
      navigate(WELCOME_PAGE);
    }).catch((e) => {
      dispatch(setConsole(t("createPost-err")));
    })
  });

  return (
    <div className="reply">
      <ReplyBar />
      <NewInfo />
      <input value={title}
        onChange={(event) => { setTitle(event.target.value) }}
        className="new-title"
        type="text"
        placeholder={t("title")} />
      <div ref={inputRef}
        className="input-box input-box-full"
        onPaste={pasteAsPlain}
        onBlur={(event) => dispatch(setReplyHtml(id, event.target.innerHTML))}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: replyHtml }}>
      </div>
      <div className="reply-move">
        <UploadImageBtn id={id} />
        <div className="flex-empty"></div>
        <div className="word-btn" onClick={httpSetContent}>{t("submit")}</div>
      </div>
    </div>
  )
}