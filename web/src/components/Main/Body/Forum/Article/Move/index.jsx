import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setReplyId } from 'redux/actions/common';
import { setForum } from 'redux/actions/forum';
import { REPLY_BOX_ATTR } from 'config/constant';
import queryRequest from 'service/request/queryRequest';
import useThrottle from 'util/useThrottle';
import './Move.scss';

export default function Move({ id }) {
  const { articleCount, articleList } = useSelector(state => ({
    articleCount: state.forum[id].count,
    articleList: state.forum[id].articleList
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const httpGetContent = useThrottle(() => {
    let page = Math.floor(articleList.length / 10);
    queryRequest.getArticleByPage(id, page)
      .then(forum => dispatch(setForum(forum)))
      .catch(e => console.log("Failed to get contents", e));
  })

  const openReply = () => {
    dispatch(setReplyId(id));
  }

  const getOpenNode = () => {
    if (articleCount === 1)//only one content
      return <div className={"open"} disabled>{t("text.move.open.none")}</div>

    if (articleList.length === articleCount)//already open all
      return <div className={"open"} disabled></div>

    const remain = articleCount - articleList.length;
    if (articleList.length === 1)//not open any yet
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