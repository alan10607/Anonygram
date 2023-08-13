import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addReplyHtml, setConsole, setReplyId } from 'redux/actions/common';
import { deleteArticle, deleteContent } from 'redux/actions/forum';
import forumRequest from 'service/request/forumRequest';
import { REPLY_BOX_ATTR } from 'util/constant';
import { scrollTo } from 'util/inputControll';
import { getTimeFromStr } from 'util/timeUtil';
import useThrottle from 'util/useThrottle';
import './info.scss';

export default function Info({ id, no }) {
  const { authorId, createDate, userId } = useSelector(state => ({
    authorId: state.forum.get(id).contentList[no].authorId,
    createDate: state.forum.get(id).contentList[no].createDate,
    userId: state.user.userId,
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const deleteArticleOrContent = useThrottle(() => {
    if (no === 0) {
      httpDeleteArticle();
    } else {
      httpDeleteContent();
    }
  })

  const httpDeleteArticle = () => {
    forumRequest.deleteArticle(id)
      .then(() => {
        dispatch(deleteArticle(id));
        dispatch(setConsole(t("tip.forum.article.delete.ok")));
      })
      .catch(e => dispatch(setConsole(t("tip.forum.article.delete.error"))));
  }

  const httpDeleteContent = () => {
    forumRequest.deleteContent(id, no)
      .then(() => {
        dispatch(deleteContent(id, no));
        dispatch(setConsole(t("tip.forum.content.delete.ok")));
      })
      .catch(e => dispatch(setConsole(t("tip.forum.content.delete.error"))));
  }

  const openReplyBoxAndScroll = () => {
    dispatch(setReplyId(id));
    dispatch(addReplyHtml(id, `<div>@${no}</div>`));
    scrollTo(`${id}_reply`);
  }

  return (
    <div className="info">
      <div>@{no}, {getTimeFromStr(createDate)}</div>
      <div className="info-btn" onClick={openReplyBoxAndScroll} {...REPLY_BOX_ATTR}>{t("common.reply")}</div>
      {userId === authorId && <div className="info-btn" onClick={deleteArticleOrContent}>{t("common.delete")}</div>}
    </div>
  )
}