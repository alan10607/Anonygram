import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setConsole } from 'redux/actions/common';
import { deleteUser, setUser } from 'redux/actions/user';
import userRequest from 'service/request/userRequest';
import { ICON_USER } from 'config/constant';
import { useUploadImage } from 'util/imageUtil';
import useThrottle from 'util/useThrottle';
import './setting.scss';

export default function Setting() {
  const { userId, username, email, isAnonymous, headUrl, language, theme } = useSelector(state => ({
    userId: state.user.id,
    username: state.user.username,
    email: state.user.email,
    isAnonymous: state.user.isAnonymous,
    headUrl: state.user.headUrl,
    language: state.user.language,
    theme: state.user.theme,
  }), shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const uploadImage = useUploadImage();

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
    uploadImage(event)
      .then(imageUrl => userRequest.updateHeadUrl(imageUrl))
      .then(user => dispatch(setUser(user)))
      .catch(e => dispatch(setConsole(t("tip.setting.headUrl.error"))));
  })

  const updateLanguage = useThrottle((language) => {
    userRequest.updateLanguage(language)
      .then(user => dispatch(setUser(user)))
      .catch(e => console.log("Update language failed", e));
  });

  const updateTheme = useThrottle((theme) => {
    userRequest.updateTheme(theme)
      .then(user => dispatch(setUser(user)))
      .catch(e => console.log("Update theme failed", e))
  });

  const logout = () => {
    dispatch(deleteUser());
    navigate("/login");
  }

  const getOptionNode = (optionArray) => {
    const nodeList = [];
    optionArray.forEach(opt => {
      nodeList.push(<option key={opt.name} value={opt.value}>{opt.name}</option>);
    });
    return nodeList;
  }

  return (
    <div id="setting">
      <div className="user-info">
        <label className="upload-head-btn">
          {isAnonymous ?
            <img className="head icon" src={ICON_USER} alt="ICON_USER" disabled /> :
            <img className="head" src={headUrl} alt="headUrl" />}
          <input type="file" accept="image/*" onChange={uploadHead} disabled={isAnonymous} />
        </label>
        <div>
          <div className="username">{username}</div>
          <div className="email">{email}</div>
          <div className="user-id">#{userId}</div>
        </div>
      </div>
      <div className="setting-option">
        <div>{t("common.lang")}</div>
        <select value={language}
          onChange={(event) => { updateLanguage(event.target.value) }}
          disabled={isAnonymous}>
          {getOptionNode(LANGUAGE_OPTIONS)}
        </select>
      </div>
      <div className="setting-option">
        <div>{t("common.theme")}</div>
        <select value={theme}
          onChange={(event) => { updateTheme(event.target.value) }}
          disabled={isAnonymous}>
          {getOptionNode(THEME_OPTIONS)}
        </select>
      </div>
      <div className="flex-empty"></div>
      <input className="logout" type="button" onClick={logout} value={t("common.logout")} ></input>
    </div>
  )

}