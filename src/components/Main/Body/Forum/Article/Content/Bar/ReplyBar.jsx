import { shallowEqual, useSelector } from 'react-redux';
import { ICON_USER } from 'config/constant';
import './bar.scss';

export default function ReplyBar() {
  const { username } = useSelector(state => ({
    username: state.user.username
  }), shallowEqual);

  return (
    <div className="bar">
      <img className="head icon" src={ICON_USER} alt="ICON_USER" />
      <div className="author">{username}</div>
      <div className="flex-empty"></div>
    </div>
  )
}