import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateContentLike } from 'redux/actions/forum';
import forumRequest from 'service/request/forumRequest';
import { ICON_LIKE } from 'config/constant';
import useThrottle from 'util/useThrottle';
import HeadIcon from './HeadIcon';
import './Bar.scss';

export default function Bar({ id, no }) {
  const { authorName, authorHeadUrl, like, likes } = useSelector(state => ({
    authorName: state.forum.get(id).contentList[no].authorName,
    authorHeadUrl: state.forum.get(id).contentList[no].authorHeadUrl,
    like: state.forum.get(id).contentList[no].like,
    likes: state.forum.get(id).contentList[no].likes
  }), shallowEqual);
  const dispatch = useDispatch();

  const toggleLike = useThrottle(() => {
    const updatedLike = !like;
    forumRequest.updateContentLike(id, no, updatedLike)
      .then(() => dispatch(updateContentLike(id, no, updatedLike)))
      .catch(e => console.log(`Update content like to ${updatedLike} failed`, e));
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