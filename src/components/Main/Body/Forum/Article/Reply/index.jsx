import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setConsole, setReplyHtml, setReplyId } from 'redux/actions/common';
import { setContent } from 'redux/actions/forum';
import forumRequest from 'service/request/forumRequest';
import { REPLY_BOX_ATTR } from 'util/constant';
import { pasteAsPlain, useInputFilter } from 'util/inputControll';
import useThrottle from 'util/useThrottle';
import ReplyBar from '../Content/Bar/ReplyBar';
import ReplyInfo from '../Content/Info/ReplyInfo';
import UploadImageBtn from './UploadImgBtn';
import './reply.scss';


export default function Reply({ id }) {
  const inputRef = useRef();
  const { replyId, replyHtml } = useSelector(state => ({
    replyId: state.common.replyId,
    replyHtml: state.common.replyHtml[id]
  }), shallowEqual);
  const isOpen = replyId === id;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputFilter = useInputFilter();

  const httpSetContent = useThrottle(() => {
    inputFilter(inputRef.current)
      .then(word => forumRequest.setContent(id, word))
      .then(content => {
        dispatch(setContent(content));
        dispatch(setReplyId(""));
        dispatch(setReplyHtml(id, "<div><br></div>"));
      })
      .catch(e => dispatch(setConsole(t("tip.forum.content.set.error"))))
  });

  return (
    <div id={`${id}_reply`} className="reply" disabled={!isOpen} {...REPLY_BOX_ATTR}>
      <ReplyBar />
      <ReplyInfo id={id} />
      <div ref={inputRef}
        className="input-box"
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