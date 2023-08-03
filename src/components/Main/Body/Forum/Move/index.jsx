import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { findTopCont } from '../../../../redux/actions/post';
import { replySetId, replySetOpen } from '../../../../redux/actions/reply';
import { REPLY_BOX_ATTR } from '../../../../util/constant';
import useThrottle from '../../../../util/useThrottle';
import './index.scss';

export default function Move({ id }) {
  const { contNum, contList } = useSelector(state => ({
    contNum: state.post.get(id).contNum,
    contList: state.post.get(id).contList
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const firstNotNull = contList.findIndex(cont => !cont);
  const start = firstNotNull === -1 ? contList.length : firstNotNull;
  const remain = contNum - contList.filter(cont => cont).length;

  const getOpenStr = () => {
    if (contNum === 1) return t("open-none");//只有本文
    if (remain === 0) return "";//已展開全部留言
    if (start === 1) return t("open-all", { remain });//尚未展開
    return t("open-remain", { remain });//展開剩餘
  }

  const doFindTopCont = useThrottle(() => {
    if (remain) dispatch(findTopCont({ id, no: start }));
  })

  const openReply = () => {
    dispatch(replySetId(id));
    dispatch(replySetOpen(true));
  }

  return (
    <div className="move">
      <div className={"open " + (contNum === 1 ? "not-open" : "")} onClick={doFindTopCont}>
        {getOpenStr(contNum, start)}
      </div>
      <div className="flex-empty"></div>
      <div className="reply-btn" onClick={openReply} {...REPLY_BOX_ATTR}>{t("add-cont")}</div>
    </div>
  )
}