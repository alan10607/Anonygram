import { WELCOME_PAGE } from 'config/constant';
import ValidationError from 'error/ValidationError';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setConsole, setReplyHtml } from 'redux/actions/common';
import { deleteForums } from 'redux/actions/forums';
import articleRequest from 'service/request/articleRequest';
import { pasteAsPlain, titleFilter, wordFilter } from 'util/inputHtmlUtil';
import useThrottle from 'util/useThrottle';
import ReplyBar from '../Content/Bar/ReplyBar';
import NewInfo from '../Content/Info/NewInfo';
import './Reply.scss';
import UploadImageBtn from './UploadImgBtn';

export default function NewReply({ id = "new" }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef();
  const { replyHtml } = useSelector(state => ({
    replyHtml: state.common.replyHtml[id]
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {//init input html
    if (!replyHtml) {
      dispatch(setReplyHtml(id, "<div><br></div>"));
    }
  }, [replyHtml])

  const createArticle = useThrottle(() => {
    let processedTitle, processedWord;
    try {
      processedTitle = titleFilter(title);
      processedWord = wordFilter(inputRef.current);
    } catch (e) {
      if (e instanceof ValidationError) {
        dispatch(setConsole(e.message));
      } else {
        console.log("InputFilter error", e);
      }
      return;
    }

    articleRequest.create(processedTitle, processedWord)
      .then(article => {
        dispatch(deleteForums());//reload forum page
        dispatch(setReplyHtml(id, "<div><br></div>"));
        navigate(WELCOME_PAGE);
      })
      .catch(e => console.log("Failed to create article", e))
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
        <div className="text-btn" onClick={createArticle}>{t("common.submit")}</div>
      </div>
    </div>
  )
}