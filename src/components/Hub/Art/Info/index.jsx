import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteCont, deletePost } from '../../../../redux/actions/post';
import { getTimeFromStr } from '../../../../utli/time';
import './index.scss';

export default function Info({ id, no = 0 }) {
  const { cont: { author, createDate }, userId, username } = useSelector(state => ({
    cont: state.post.get(id).contList[no],
    userId: state.user.userId,
    username: state.user.username
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const canDel = userId.toString() == author || (userId == -1 && username == author);
  const deletePostOrCont = () => {
    dispatch(no == 0 ? deletePost({ id, no }) : deleteCont({ id, no }));
  };

  return (
    <div className="info">
      <div>B{no}, {getTimeFromStr(createDate)}</div>
      {canDel && <div className="del" onClick={deletePostOrCont}>{t("del")}</div>}
    </div>
  )
}