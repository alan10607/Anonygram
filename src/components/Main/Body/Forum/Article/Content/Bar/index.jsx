import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { likeContent, unlikeContent, updateContentLike } from 'redux/actions/forum';
import forumRequest from 'service/request/forumRequest';
import { ICON_USER, ICON_LIKE } from 'util/constant';
import useThrottle from 'util/useThrottle';
import './bar.scss';

export default function Bar({ id, no }) {
  const { authorName, like, likes } = useSelector(state => ({
    authorName: state.forum.get(id).contentList[no].authorName,
    like: state.forum.get(id).contentList[no].like,
    likes: state.forum.get(id).contentList[no].likes
  }), shallowEqual);
  const dispatch = useDispatch();

  const toggleLike = useThrottle(() => {
    const updatedLike = !like;
    forumRequest.likeContent(id, no, updatedLike)
      .then(() => dispatch(updateContentLike(id, no, updatedLike)))
      .catch(e => console.log(`Update content like to ${updatedLike} failed`, e));
  })


  return (
    <div className="bar">
      <img className="head icon" src={ICON_USER} alt="ICON_USER" />
      <div className="author">{authorName}</div>
      <div className="flex-empty"></div>
      <div className={"like-icon " + (like ? "like-icon-enable" : "")}>
        <img src={ICON_LIKE} onClick={toggleLike} alt="ICON_LIKE" />
        <div>{likes}</div>
      </div>
    </div>
  )
}