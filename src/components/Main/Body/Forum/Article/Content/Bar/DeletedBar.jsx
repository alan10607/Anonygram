import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { likeContent, unlikeContent, updateContentLike } from 'redux/actions/forum';
import forumRequest from 'service/request/forumRequest';
import { ICON_USER, ICON_LIKE } from 'util/constant';
import useThrottle from 'util/useThrottle';
import './bar.scss';
import { useTranslation } from 'react-i18next';

export default function DeletedBar() {
  const { t } = useTranslation();

  return (
    <div className="bar">
      <img className="head icon" src={ICON_USER} alt="ICON_USER" />
      <div className="author">{t("del-author")}</div>
    </div>

  )
}