import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './setting.scss';
import { ICON_USER, LANGUAGE_OPTIONS, THEME_OPTIONS } from 'util/constant';
import SettingOption from './SettingOption';
import { deleteUser, setLanguage, setTheme, setUser } from 'redux/actions/user';
import useThrottle from 'util/useThrottle';
import { convertToBase64FromFiles } from 'util/image';
import ValidationError from 'util/validationError';
import { setConsole } from 'redux/actions/common';
import userRequest from 'service/request/userRequest';

export default function Setting() {
  const { userId, username, email, isAnonymous, language, theme } = useSelector(state => ({
    userId: state.user.id,
    username: state.user.username,
    email: state.user.email,
    isAnonymous: state.user.isAnonymous,
    language: state.user.language,
    theme: state.user.theme,
  }), shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logout = () => {
    dispatch(deleteUser());
    navigate("/login");
  }

  const LANGUAGE_OPTIONS = [{
    name: "English",
    value: "en"
  }, {
    name: "繁體中文",
    value: "zh-TW"
  }];

  const THEME_OPTIONS = [{
    name: t("text.setting.theme.dark"),
    value: "dark"
  }, {
    name: t("text.setting.theme.light"),
    value: "light"
  }];

  const uploadHead = useThrottle((event) => {
    convertToBase64FromFiles(event.target.files).then(compressedBase64 => {
      return userRequest.updateHeadUrl(compressedBase64);
    }).then(() => {
      return userRequest.get();
    }).then((res) => {
      dispatch(setUser(res));
    }).catch(e => {
      console.log("Image load failed", e);
      if (e instanceof ValidationError) {
        dispatch(setConsole(t("load-img-err-reason", { reason: e.message })));
      } else {
        dispatch(setConsole(t("load-img-err")));
      }
    }).finally(() => {
      event.target.value = "";//remove file
    })
  })

  return (
    <div id="setting">
      <div className="user-info">
        <label className="upload-head-btn">
          <img className="head icon" src={ICON_USER} alt="ICON_USER" />
          <input type="file" accept="image/*" onChange={uploadHead} />
        </label>
        <div>
          <div className="username">{username}</div>
          <div className="email">{email}</div>
          <div className="user-id">#{userId}</div>
        </div>
      </div>
      <div className="setting-main">
        <SettingOption name={t("common.lang")}
          optionArray={LANGUAGE_OPTIONS}
          value={language}
          setValue={(language) => dispatch(setUser({ language }))} />
        <SettingOption name={t("common.theme")}
          optionArray={THEME_OPTIONS}
          value={theme}
          setValue={(theme) => dispatch(setUser({ theme }))} />
      </div>
      <div className="flex-empty"></div>
      <input className="logout" type="button" onClick={logout} value={t("common.logout")} ></input>
    </div>
  )

}