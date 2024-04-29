import { REPLY_BOX_ATTR } from 'config/constant';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addReplyHtml, setConsole, setReplyId } from 'redux/actions/common';
import { setDiscussion } from 'redux/actions/discussions';
import articleRequest from 'service/request/articleRequest';
import discussionRequest from 'service/request/discussionRequest';
import { scrollTo } from 'util/inputHtmlUtil';
import { getTimeFromStr } from 'util/timeUtil';
import useThrottle from 'util/useThrottle';
import './Info.scss';

export default function Info({ article: { articleId: id, no, authorId, createdTime } }) {
  const { user: { id: userId } } = useSelector(state => ({
    user: state.user,
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const deleteArticle = useThrottle(() => {
    articleRequest.delete(id, no)
      .then(() => discussionRequest.get(id, no))
      .then(discussion => {
        dispatch(setDiscussion(discussion));
        dispatch(setConsole(no === 0 ?
          t("tip.forum.article.delete.ok") :
          t("tip.forum.content.delete.ok")));
      })
      .catch(e => console.log(`Failed to delete article, ${id}/${no}`, e));
  })

  const openReplyBoxAndScroll = () => {
    dispatch(setReplyId(id));
    dispatch(addReplyHtml(id, `<div>@${no}</div>`));
    scrollTo(`${id}_reply`);
  }

  return (
    <div className="info">
      <div>@{no}, {getTimeFromStr(createdTime)}</div>
      <div className="info-btn" onClick={openReplyBoxAndScroll} {...REPLY_BOX_ATTR}>{t("common.reply")}</div>
      {userId === authorId && <div className="info-btn" onClick={deleteArticle}>{t("common.delete")}</div>}
    </div>
  )
}