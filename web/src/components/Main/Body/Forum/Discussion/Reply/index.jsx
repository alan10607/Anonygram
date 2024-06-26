import { REPLY_BOX_ATTR } from 'config/constant';
import ValidationError from 'error/ValidationError';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setConsole, setReplyHtml, setReplyId } from 'redux/actions/common';
import { setDiscussion } from 'redux/actions/discussions';
import articleRequest from 'service/request/articleRequest';
import discussionRequest from 'service/request/discussionRequest';
import { pasteAsPlain, wordFilter } from 'util/inputHtmlUtil';
import useThrottle from 'util/useThrottle';
import ReplyBar from '../Article/Bar/ReplyBar';
import ReplyInfo from '../Article/Info/ReplyInfo';
import './Reply.scss';
import UploadImageBtn from './UploadImgBtn';

export default function Reply({ discussion, discussion: { articleId: id } }) {
  const inputRef = useRef();
  const { replyId, replyHtml } = useSelector(state => ({
    replyId: state.common.replyId,
    replyHtml: state.common.replyHtml[id]
  }), shallowEqual);
  const isOpen = replyId === id;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {//init input html
    if (!replyHtml) {
      dispatch(setReplyHtml(id, "<div><br></div>"));
    }
  }, [replyHtml])

  const createReplyArticle = useThrottle(() => {
    let processedWord;
    try {
      processedWord = wordFilter(inputRef.current);
    } catch (e) {
      if (e instanceof ValidationError) {
        dispatch(setConsole(e.message));
      } else {
        console.log("InputFilter error", e);
      }
      return;
    }

    articleRequest.createReply(id, processedWord)
      .then(article => discussionRequest.get(article.articleId, article.no))
      .then(discussion => {
        dispatch(setDiscussion(discussion));
        dispatch(setReplyId(""));
        dispatch(setReplyHtml(id, "<div><br></div>"));
      })
      .catch(e => console.log("Failed to reply article", e))
  });

  return (
    <div id={`${id}_reply`} className="reply" disabled={!isOpen} {...REPLY_BOX_ATTR}>
      <ReplyBar />
      <ReplyInfo discussion={discussion} />
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
        <div className="text-btn" onClick={createReplyArticle}>{t("common.submit")}</div>
      </div>
    </div>
  )
}