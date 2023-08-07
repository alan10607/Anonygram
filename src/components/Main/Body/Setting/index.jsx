import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './setting.scss';
import { ICON_USER, LANGUAGE_OPTIONS, THEME_OPTIONS } from 'util/constant';
import SettingOption from './SettingOption';
import { deleteUser, setLanguage, setTheme } from 'redux/actions/user';

export default function Setting() {
  const { user: { userId, username, isAnonymous, language, theme } } = useSelector(state => ({
    user: state.user
  }), shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logout = () => {
    dispatch(deleteUser());
    navigate("/login");
  }

  return (
    <div id="setting">
      <div className="user-info">
        <img className="head icon" src={ICON_USER} alt="ICON_USER" />
        <div>
          <div className="username">{username}</div>
          <div className="user-id">#{userId}</div>
        </div>
      </div>
      <div className="setting-main">
        <SettingOption name={t("lang")}
          optionArray={LANGUAGE_OPTIONS}
          value={language}
          setValue={(v) => dispatch(setLanguage(v))} />
        <SettingOption name={t("theme")}
          optionArray={THEME_OPTIONS}
          value={theme}
          setValue={(v) => dispatch(setTheme(v))} />
      </div>
      <div className="flex-empty"></div>
      <input className="logout" type="button" onClick={logout} value={t("logout")} ></input>// pointer?
    </div>
  )

}