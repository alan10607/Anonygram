import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { likeContent, unlikeContent } from '../../../../redux/actions/post';
import { ICON_USER, ICON_LIKE } from '../../../../util/constant';
import useThrottle from '../../../../util/useThrottle';
import './index.scss';

export default function Bar({ id, no = 0 }) {
  const { authorName, isUserLike, likes } = useSelector(state => ({
    authorName: state.post.get(id).contList[no].authorName,
    isUserLike: state.post.get(id).contList[no].isUserLike,
    likes:      state.post.get(id).contList[no].likes
  }), shallowEqual);
  const dispatch = useDispatch();
  const toggleLike = useThrottle(() => {
    dispatch(isUserLike ? unlikeContent({ id, no }) : likeContent({ id, no }));
  })

  return (
    <div className="bar">
      <img className="head icon" src={ICON_USER} alt="ICON_USER"/>
      <div className="author">{authorName}</div>
      <div className={"likes-icon " + (isUserLike ? "likes-icon-yes" : "")}>
        <img src={ICON_LIKE} onClick={toggleLike} alt="ICON_LIKE" />
        <div>{likes}</div>
      </div>
    </div>
  )
}