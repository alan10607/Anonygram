import { useSelector, shallowEqual } from 'react-redux';
import { Link } from "react-router-dom";
import { ICON_ADD, ICON_OPTION } from 'util/constant';
import "./head.scss";

export default function Header() {
  const { username, isAnonyUser } = useSelector(state => ({
    username: state.user.username,
    isAnonumous: state.user.isAnonumous
  }), shallowEqual);
  const user = (isAnonyUser ? "#" : "") + username;

  return (
    <div className="header">
      <div>
        <div className="user">{user}</div>
        <Link to="/forum">
          <img className="icon" src={ICON_ADD} alt="ICON_ADD" />
        </Link>
        <Link to="/forum/new">
          <img className="icon" src={ICON_OPTION} alt="ICON_OPTION" />
        </Link>
        <Link to="/forum/setting">
          <img className="icon" src={ICON_OPTION} alt="ICON_OPTION" />
        </Link>
      </div>
    </div>
  )
}