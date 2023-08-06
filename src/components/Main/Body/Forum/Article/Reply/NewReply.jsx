import { useRef, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { inputFilter } from 'util/inputControll';
import { REPLY_BOX_ATTR } from 'util/constant';
import useConsole from 'util/useConsole';
import useThrottle from 'util/useThrottle';
import './reply.scss';
import forumRequest from 'service/request/forumRequest';
import { setContent } from 'redux/actions/forum';
import i18next from "i18next";
import UploadImageBtn from './UploadImgBtn';
import { pasteAsPlain } from 'util/inputControll';
import { setReplyHtml, setReplyId } from 'redux/actions/common';
import ReplyBar from '../Content/Bar/ReplyBar';
import ReplyInfo from '../Content/Info/ReplyInfo';


export default function NewReply({ id = "new" }) {
  const inputRef = useRef();
  const { replyId, replyHtml } = useSelector(state => ({
    replyId: state.common.replyId,
    replyHtml: state.common.replyHtml[id]
  }), shallowEqual);
  const dispatch = useDispatch();
  const showConsole = useConsole();
  const { t } = useTranslation();

  const httpSetContent = useThrottle(() => {
    const word = inputFilter(inputRef.current);
    if (word.trim() === "") return showConsole(t("empty-word"));
    if (word.length > 3000) return showConsole(t("too-many-word", { length: word.length}));

    console.log(`Upload word:\n${word}`);
    forumRequest.setContent(id, word).then((content) => {
      dispatch(setContent(content));
      dispatch(setReplyId(""));
      setHtml("<br>");
    }).catch((e) => {
      dispatch(showConsole(i18next.t("replyPost-err")));
    })
  });

  const setHtml = (html) => {
    dispatch(setReplyHtml(id, html));
  }

  return (
    <div id={`${id}_reply`} className="reply" {...REPLY_BOX_ATTR}>
      <div ref={inputRef}
        className="input-box"
        onPaste={pasteAsPlain}
        onBlur={(event) => setHtml(event.target.innerHTML)}
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