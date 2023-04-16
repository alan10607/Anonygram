import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { findTopCont } from '../../../../redux/actions/post';
import { replySetId, replySetOpen } from '../../../../redux/actions/reply';
import { REPLY_BOX_ATTR } from '../../../../utli/constant';
import './index.scss';

export default function Move({ id }) {
  const { contNum, contList } = useSelector(state => ({
    contNum : state.post.get(id).contNum,
    contList: state.post.get(id).contList
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getStartNo = () => {
    let i = 0;
    while(i < contList.length) {
      if(contList[i] == null) break;
      ++i;
    }
    return i;
  }
  const startNo = getStartNo();

  const getOpenStr = (contNum, startNo) => {
    const remain = contNum - startNo;
    if (contNum == 1) return t("open-none");//只有本文
    if (remain == 0) return "";//已展開全部留言
    if (startNo == 1) return t("open-all", {remain});//尚未展開
    return t("open-remain", {remain});
  }

  const openReply = () => {
    dispatch(replySetId(id));
    dispatch(replySetOpen(true));
  }

  return (
    <div className="move">
      <div className={"open " + (contNum == 1 ? "not-open" : "")} onClick={() => {
        dispatch(startNo == contNum ? null : findTopCont({ id, no : startNo }));
      }}>
        {getOpenStr(contNum, startNo)}
      </div>
      <div className="flex-empty"></div>
      <div className="reply-btn" onClick={openReply} {...REPLY_BOX_ATTR}>{t("add-cont")}</div>
    </div>
  )
}