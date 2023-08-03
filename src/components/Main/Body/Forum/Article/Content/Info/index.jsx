import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addReplyHtml, setConsole, setReplyId } from 'redux/actions/common';
import { deleteArticle, deleteContent } from 'redux/actions/forum';
import forumRequest from 'service/request/forumRequest';
import { REPLY_BOX_ATTR } from 'config/constant';
import { scrollTo } from 'util/inputHtmlUtil';
import { getTimeFromStr } from 'util/timeUtil';
import useThrottle from 'util/useThrottle';
import './Info.scss';

export default function Info({ id, no }) {
  const { authorId, createDate, userId } = useSelector(state => ({
    authorId: state.forum.get(id).contentList[no].authorId,
    createDate: state.forum.get(id).contentList[no].createDate,
    userId: state.user.id,
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const httpDeleteContent = useThrottle(() => {
    forumRequest.deleteContent(id, no)
      .then(() => {
        if (no === 0) {
          dispatch(deleteArticle(id));
          dispatch(setConsole(t("tip.forum.article.delete.ok")));
        } else {
          dispatch(deleteContent(id, no));
          dispatch(setConsole(t("tip.forum.content.delete.ok")));
        }
      })
      .catch(e => console.log(`Failed to delete content, id=${id}, no=${no}`, e));
  })

  const openReplyBoxAndScroll = () => {
    dispatch(setReplyId(id));
    dispatch(addReplyHtml(id, `<div>@${no}</div>`));
    scrollTo(`${id}_reply`);
  }

  return (
    <div className="info">
      <div>@{no}, {getTimeFromStr(createDate)}</div>
      <div className="info-btn" onClick={openReplyBoxAndScroll} {...REPLY_BOX_ATTR}>{t("common.reply")}</div>
      {userId === authorId && <div className="info-btn" onClick={httpDeleteContent}>{t("common.delete")}</div>}
    </div>
  )
}