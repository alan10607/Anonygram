import { useRef, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { inputFilter } from 'util/inputControll';
import { WELCOME_PAGE } from 'util/constant';
import useConsole from 'util/useConsole';
import useThrottle from 'util/useThrottle';
import './reply.scss';
import forumRequest from 'service/request/forumRequest';
import { deleteAllId } from 'redux/actions/forum';
import i18next from "i18next";
import UploadImageBtn from './UploadImgBtn';
import { pasteAsPlain } from 'util/inputControll';
import { setReplyHtml } from 'redux/actions/common';
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
  const showConsole = useConsole();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const httpSetContent = useThrottle(() => {
    if (title.trim() === "") return showConsole(t("empty-title"));
    if (title.length > 50) return showConsole(t("too-many-title", { length: title.length }));
    const word = inputFilter(inputRef.current);
    if (word.trim() === "") return showConsole(t("empty-word"));
    if (word.length > 3000) return showConsole(t("too-many-word", { length: word.length }));

    forumRequest.setArticle(title, word).then((content) => {
      dispatch(deleteAllId());//reload forum page
      dispatch(setReplyHtml(id, "<div><br></div>"));
      navigate(WELCOME_PAGE);
    }).catch((e) => {
      dispatch(showConsole(i18next.t("createPost-err")));
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