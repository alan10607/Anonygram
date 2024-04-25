import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setReplyId } from 'redux/actions/common';
import { setForum } from 'redux/actions/forums';
import { REPLY_BOX_ATTR } from 'config/constant';
import forumRequest from 'service/request/forumRequest';
import useThrottle from 'util/useThrottle';
import './Move.scss';

export default function Move({ id }) {
  const { articleCount, articles } = useSelector(state => ({
    articleCount: state.forums[id].count,
    articles: state.forums[id].articles
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const findFirstUnreadNo = () => {
    for (let i = 0; i < articles.length - 1; i++) {
      if (!articles[i]) {
        return i;
      }
    }
    return articles.length;
  }

  const httpGetContent = useThrottle(() => {
    let page = Math.floor(findFirstUnreadNo() / 10) + 1;
    forumRequest.getByPage(id, page)
      .then(forum => dispatch(setForum(forum)))
      .catch(e => console.log("Failed to get contents", e));
  })

  const openReply = () => {
    dispatch(setReplyId(id));
  }

  const getOpenNode = () => {
    let readedArticleSize = articles.filter(a => a != null).length;
    if (articleCount === 1)//only one content
      return <div className={"open"} disabled>{t("text.move.open.none")}</div>

    if (readedArticleSize === articleCount)//already open all
      return <div className={"open"} disabled></div>

    const remain = articleCount - readedArticleSize;
    if (readedArticleSize === 1)//not open any yet
      return <div className={"open"} onClick={httpGetContent}>{t("text.move.open.all", { remain })}</div>

    //open remain
    return <div className={"open"} onClick={httpGetContent}>{t("text.move.open.remain", { remain })}</div>
  }

  return (
    <div className="move">
      {getOpenNode()}
      <div className="flex-empty"></div>
      <div className="text-btn" onClick={openReply} {...REPLY_BOX_ATTR}>{t("common.reply")}</div>
    </div>
  )
}