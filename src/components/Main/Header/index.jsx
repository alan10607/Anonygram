import { shallowEqual, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { ICON_ADD, ICON_FORUM, ICON_LOGO, ICON_SETTING } from 'config/constant';
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
      <NavLink to="/forum/index">
        <img className="icon" src={ICON_FORUM} alt="ICON_FORUM" />
      </NavLink>
      <NavLink to="/forum/new">
        <img className="icon" src={ICON_ADD} alt="ICON_SETTING" />
      </NavLink>
      <NavLink to="/forum/setting">
        <img className="icon" src={ICON_SETTING} alt="ICON_SETTING" />
      </NavLink>
    </div>
  )
}