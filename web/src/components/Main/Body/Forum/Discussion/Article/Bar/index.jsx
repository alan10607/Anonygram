import { ICON_LIKE } from 'config/constant';
import { useDispatch } from 'react-redux';
import { setDiscussion } from 'redux/actions/discussions';
import likeRequest from 'service/request/LikeRequest';
import discussionRequest from 'service/request/discussionRequest';
import useThrottle from 'util/useThrottle';
import './Bar.scss';
import HeadIcon from './HeadIcon';

export default function Bar({ article: { articleId: id, no, authorName, authorHeadUrl, like, likeCount } }) {
  const dispatch = useDispatch();

  const toggleLike = useThrottle(() => {
    const likeAction = like ? likeRequest.delete : likeRequest.create;

    likeAction(id, no)
      .then(() => discussionRequest.get(id, no))
      .then(discussion => dispatch(setDiscussion(discussion)))
      .catch(error => console.log(`Update content like to ${!like} failed`, error));
  })

  return (
    <div className="bar">
      <HeadIcon headUrl={authorHeadUrl} />
      <div className="author">{authorName}</div>
      <div className="flex-empty"></div>
      <div className="like-icon" disabled={!like}>
        <img src={ICON_LIKE} onClick={toggleLike} alt="ICON_LIKE" />
        <div>{likeCount}</div>
      </div>
    </div>
  )
}