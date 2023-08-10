import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTimeFromStr } from 'util/time';
import useThrottle from 'util/useThrottle';
import './info.scss';
import forumRequest from 'service/request/forumRequest';
import { deleteArticle, deleteContent } from 'redux/actions/forum';
import { addReplyHtml, setConsole, setReplyHtml, setReplyId } from 'redux/actions/common';
import { scrollTo } from 'util/inputControll';
import { REPLY_BOX_ATTR } from 'util/constant';

export default function Info({ id, no }) {
  const { author, createDate, userId, replyHtml } = useSelector(state => ({
    author: state.forum.get(id).contList[no].author,
    createDate: state.forum.get(id).contList[no].createDate,
    userId: state.user.userId,
    replyHtml: state.common.replyHtml[id]
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const deletePostOrCont = useThrottle(() => {
    if (no === 0) {
      httpDeleteArticle();
    }else{
      httpDeleteContent();
    }
  })

  const httpDeleteArticle = () => {
    forumRequest.deleteArticle(id).then((res) => {
      dispatch(deleteArticle(id));
      dispatch(setConsole(t("deletePost-ok")));
    }).catch((e) => {
      dispatch(setConsole(t("deletePost-err")));
    });
  }

  const httpDeleteContent = () => {
    forumRequest.deleteContent(id, no).then((res) => {
      dispatch(deleteContent(id, no));
      dispatch(setConsole(t("deleteCont-ok")));
    }).catch((e) => {
      dispatch(setConsole(t("deleteCont-err")));
    });
  }

  const replyThisContent = () => {
    dispatch(setReplyId(id));
    dispatch(addReplyHtml(id, `<div>@${no}</div>`));
    scrollTo(`${id}_reply`);
  }

  return (
    <div className="info">
      <div>@{no}, {getTimeFromStr(createDate)}</div>
      <div className="info-btn" onClick={replyThisContent} {...REPLY_BOX_ATTR}>{t("reply")}</div>
      {userId === author && <div className="info-btn" onClick={deletePostOrCont}>{t("del")}</div>}
    </div>
  )
}