import { shallowEqual, useSelector } from 'react-redux';
import './Bar.scss';
import HeadIcon from './HeadIcon';

export default function ReplyBar() {
  const { user: { username, headUrl } } = useSelector(state => ({
    user: state.user
  }), shallowEqual);

  return (
    <div className="bar">
      <HeadIcon headUrl={headUrl} />
      <div className="author">{username}</div>
      <div className="flex-empty"></div>
    </div>
  )
}