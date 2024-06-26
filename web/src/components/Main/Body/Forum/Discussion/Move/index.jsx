import { REPLY_BOX_ATTR } from 'config/constant';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setReplyId } from 'redux/actions/common';
import { setDiscussion } from 'redux/actions/discussions';
import discussionRequest from 'service/request/discussionRequest';
import useThrottle from 'util/useThrottle';
import './Move.scss';

export default function Move({ discussion: { articleId: id, count, articles } }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const findFirstUnreadNo = () => {
    for (let no = 0; no < articles.length - 1; ++no) {
      if (!articles[no]) {
        return no;
      }
    }
    return articles.length;
  }

  const httpGetContent = useThrottle(() => {
    const page = Math.floor(findFirstUnreadNo() / 10) + 1;
    discussionRequest.getByPage(id, page)
      .then(discussion => dispatch(setDiscussion(discussion)))
      .catch(e => console.log("Failed to get contents", e));
  })

  const openReply = () => {
    dispatch(setReplyId(id));
  }

  const getOpenNode = () => {
    let readedArticleSize = articles.filter(a => a != null).length;
    const remain = count - readedArticleSize;

    if (count === 1) {//only one content
      return <div className="open" disabled>{t("text.move.open.none")}</div>;
    }

    if (readedArticleSize === count) {//already open all
      return <div className="open" disabled></div>;
    }

    if (readedArticleSize === 1) {//not open any yet
      return <div className="open" onClick={httpGetContent}>{t("text.move.open.all", { remain })}</div>;
    }

    //open remaining
    return <div className="open" onClick={httpGetContent}>{t("text.move.open.remain", { remain })}</div>;
  };

  return (
    <div className="move">
      {getOpenNode()}
      <div className="flex-empty"></div>
      <div className="text-btn" onClick={openReply} {...REPLY_BOX_ATTR}>{t("common.reply")}</div>
    </div>
  )
}