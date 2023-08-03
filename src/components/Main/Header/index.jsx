import { ICON_ADD, ICON_FORUM, ICON_LOGO, ICON_SETTING } from 'config/constant';
import { NavLink } from 'react-router-dom';
import './Head.scss';

export default function Header() {
  return (
    <div id="header">
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