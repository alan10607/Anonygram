import { ICON_LIKE } from 'config/constant';
import './Bar.scss';
import HeadIcon from './HeadIcon';

export default function QueryBar({ article: { authorName, authorHeadUrl, like, likeCount } }) {
  return (
    <div className="bar">
      <HeadIcon headUrl={authorHeadUrl} />
      <div className="author">{authorName}</div>
      <div className="flex-empty"></div>
      <div className="like-icon" disabled={!like}>
        <img className="no-cursor" src={ICON_LIKE} alt="ICON_LIKE" />
        <div>{likeCount}</div>
      </div>
    </div>
  )
}