import { useSelector, shallowEqual } from 'react-redux';
import { NavLink } from "react-router-dom";
import { ICON_ADD, ICON_FORUM, ICON_LOGO, ICON_OPTION } from 'util/constant';
import "./head.scss";

export default function Header() {
  const { username, isAnonyUser } = useSelector(state => ({
    username: state.user.username,
    isAnonumous: state.user.isAnonumous
  }), shallowEqual);
  const user = (isAnonyUser ? "#" : "") + username;

  return (
    <div className="header">
      <img className="logo icon" src={ICON_LOGO} alt="ICON_LOGO" />
      <div className="flex-empty"></div>
      <NavLink to="/forum">
        <img className="icon" src={ICON_FORUM} alt="ICON_FORUM" />
      </NavLink>
      <NavLink to="/forum/new">
        <img className="icon" src={ICON_ADD} alt="ICON_OPTION" />
      </NavLink>
      <NavLink to="/forum/setting">
        <img className="icon" src={ICON_OPTION} alt="ICON_OPTION" />
      </NavLink>
    </div>
  )
}