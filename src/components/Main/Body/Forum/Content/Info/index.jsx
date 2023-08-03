import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteCont, deletePost } from 'redux/actions/post';
import { getTimeFromStr } from '.util/time';
import useThrottle from 'util/useThrottle';
import './index.scss';
import forumRequest from 'service/request/forumRequest';
import { deleteArticle, deleteContent } from 'redux/actions/forum';

export default function Info({ id, no }) {
  const { author, createDate, userId } = useSelector(state => ({
    author: state.post.get(id).contList[no].author,
    createDate: state.post.get(id).contList[no].createDate,
    userId: state.user.userId
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
      dispatch(showConsole(i18next.t("deletePost-ok")));
    }).catch((e) => {
      dispatch(showConsole(i18next.t("deletePost-err")));
    });
  }

  const httpDeleteContent = () => {
    forumRequest.deleteContent(id, no).then((res) => {
      dispatch(deleteContent(id, no));
      dispatch(showConsole(i18next.t("deleteCont-ok")));
    }).catch((e) => {
      dispatch(showConsole(i18next.t("deleteCont-err")));
    });
  }




  return (
    <div className="info">
      <div>B{no}, {getTimeFromStr(createDate)}</div>
      {userId === author && <div className="del" onClick={deletePostOrCont}>{t("del")}</div>}
    </div>
  )
}