import { shallowEqual, useSelector } from 'react-redux';
import HeadIcon from './HeadIcon';
import './Bar.scss';

export default function ReplyBar() {
  const { username, headUrl } = useSelector(state => ({
    username: state.user.username,
    headUrl: state.user.headUrl
  }), shallowEqual);

  return (
    <div className="bar">
      <HeadIcon headUrl={headUrl} />
      <div className="author">{username}</div>
      <div className="flex-empty"></div>
    </div>
  )
}