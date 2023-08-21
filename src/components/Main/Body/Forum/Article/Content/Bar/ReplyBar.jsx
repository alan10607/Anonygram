import { shallowEqual, useSelector } from 'react-redux';
import { ICON_USER } from 'config/constant';
import './Bar.scss';

export default function ReplyBar() {
  const { username, headUrl } = useSelector(state => ({
    username: state.user.username,
    headUrl: state.user.headUrl
  }), shallowEqual);

  return (
    <div className="bar">
      <img className="head" src={headUrl ? headUrl : ICON_USER} alt="ICON_USER" />
      <div className="author">{username}</div>
      <div className="flex-empty"></div>
    </div>
  )
}