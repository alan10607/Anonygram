import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setForum } from 'redux/actions/forums';
import likeRequest from 'service/request/LikeRequest';
import forumRequest from 'service/request/forumRequest';
import { ICON_LIKE } from 'config/constant';
import useThrottle from 'util/useThrottle';
import HeadIcon from './HeadIcon';
import './Bar.scss';

export default function Bar({ id, no }) {
  const { authorName, authorHeadUrl, like, likes } = useSelector(state => ({
    authorName: state.forums[id].articles[no].authorName,
    authorHeadUrl: state.forums[id].articles[no].authorHeadUrl,
    like: state.forums[id].articles[no].like,
    likes: state.forums[id].articles[no].likeCount
  }), shallowEqual);
  const dispatch = useDispatch();

  const toggleLike = useThrottle(() => {
    const likeAction = like ? likeRequest.delete : likeRequest.create;

    likeAction(id, no)
      .then(() => forumRequest.get(id, no))
      .then(forum => dispatch(setForum(forum)))
      .catch(error => console.log(`Update content like to ${!like} failed`, error));
  })

  return (
    <div className="bar">
      <HeadIcon headUrl={authorHeadUrl} />
      <div className="author">{authorName}</div>
      <div className="flex-empty"></div>
      <div className="like-icon" disabled={!like}>
        <img src={ICON_LIKE} onClick={toggleLike} alt="ICON_LIKE" />
        <div>{likes}</div>
      </div>
    </div>
  )
}