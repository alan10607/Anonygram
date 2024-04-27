import { REPLY_BOX_ATTR } from 'config/constant';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addReplyHtml, setConsole, setReplyId } from 'redux/actions/common';
import { setForum } from 'redux/actions/forums';
import articleRequest from 'service/request/articleRequest';
import forumRequest from 'service/request/forumRequest';
import { scrollTo } from 'util/inputHtmlUtil';
import { getTimeFromStr } from 'util/timeUtil';
import useThrottle from 'util/useThrottle';
import './Info.scss';

export default function Info({ id, no }) {
  const { article: { authorId, createDate }, user: { id: userId } } = useSelector(state => ({
    article: state.forums[id].articles[no],
    user: state.user,
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const deleteArticle = useThrottle(() => {
    articleRequest.delete(id, no)
      .then(() => forumRequest.get(id, no))
      .then(forum => {
        dispatch(setForum(forum));
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
      <div>@{no}, {getTimeFromStr(createDate)}</div>
      <div className="info-btn" onClick={openReplyBoxAndScroll} {...REPLY_BOX_ATTR}>{t("common.reply")}</div>
      {userId === authorId && <div className="info-btn" onClick={deleteArticle}>{t("common.delete")}</div>}
    </div>
  )
}