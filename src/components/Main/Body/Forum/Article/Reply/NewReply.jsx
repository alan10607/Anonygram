import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setConsole, setReplyHtml } from 'redux/actions/common';
import { deleteAllId } from 'redux/actions/forum';
import forumRequest from 'service/request/forumRequest';
import { WELCOME_PAGE } from 'util/constant';
import { pasteAsPlain, useInputFilter } from 'util/inputControll';
import useThrottle from 'util/useThrottle';
import ReplyBar from '../Content/Bar/ReplyBar';
import NewInfo from '../Content/Info/NewInfo';
import UploadImageBtn from './UploadImgBtn';
import './reply.scss';

export default function NewReply({ id = "new" }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef();
  const { replyHtml } = useSelector(state => ({
    replyHtml: state.common.replyHtml[id]
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputFilter = useInputFilter();

  useEffect(() => {//init input html
    if(!replyHtml){
      dispatch(setReplyHtml(id, "<div><br></div>"));
    }
  }, [replyHtml])

  const checkTitle = (title) => {
    const maxLength = 3000;
    const length = title.length;
    if (length === 0) return t("tip.title.error.empty");
    if (length > maxLength) return t("tip.title.error.max", { maxLength, length });
    return "";
  }

  const httpSetContent = useThrottle(() => {
    const trimmedTitle = title.trim();
    const titleError = checkTitle(trimmedTitle);
    if (titleError !== "") {
      dispatch(setConsole(titleError));
      return
    }

    inputFilter(inputRef.current)
      .then(word => forumRequest.setArticle(trimmedTitle, word))
      .then(article => {
        dispatch(deleteAllId());//reload forum page
        dispatch(setReplyHtml(id, "<div><br></div>"));
        navigate(WELCOME_PAGE);
      })
      .catch(e => dispatch(setConsole(t("tip.forum.article.set.error"))))
  });

  return (
    <div className="reply">
      <ReplyBar />
      <NewInfo />
      <input value={title}
        onChange={(event) => { setTitle(event.target.value) }}
        className="new-title"
        type="text"
        placeholder={t("common.title")} />
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
        <div className="text-btn" onClick={httpSetContent}>{t("common.submit")}</div>
      </div>
    </div>
  )
}