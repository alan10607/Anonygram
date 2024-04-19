import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setReplyHtml, setReplyId } from 'redux/actions/common';
import { setArticle } from 'redux/actions/forum';
import articleRequest from 'service/request/articleRequest';
import { pasteAsPlain, useInputFilter } from 'util/inputHtmlUtil';
import { REPLY_BOX_ATTR } from 'config/constant';
import useThrottle from 'util/useThrottle';
import ReplyBar from '../Content/Bar/ReplyBar';
import ReplyInfo from '../Content/Info/ReplyInfo';
import UploadImageBtn from './UploadImgBtn';
import './Reply.scss';

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

  useEffect(() => {//init input html
    if(!replyHtml){
      dispatch(setReplyHtml(id, "<div><br></div>"));
    }
  }, [replyHtml])
  
  const httpCreateContent = useThrottle(() => {
    inputFilter(inputRef.current)
      .then(word => articleRequest.createReplyArticle(id, word))
      .then(article => queryRequest.getArticle(article.articleId, article.no))
      .then(article => {
        dispatch(setArticle(article));
        dispatch(setReplyId(""));
        dispatch(setReplyHtml(id, "<div><br></div>"));
      })
      .catch(e => console.log("Failed to reply article", e))
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
        <div className="text-btn" onClick={httpCreateContent}>{t("common.submit")}</div>
      </div>
    </div>
  )
}