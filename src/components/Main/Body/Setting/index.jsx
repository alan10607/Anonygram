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

  const updateLanguage = useThrottle((language) => {
    userRequest.updateLanguage(language).then(user => {
      dispatch(setUser(user));
    }).catch(e => {
      console.log("Update language failed", e);
    })
  });

  const updateTheme = useThrottle((theme) => {
    userRequest.updateTheme(theme).then(user => {
      dispatch(setUser(user));
    }).catch(e => {
      console.log("Update theme failed", e);
    })
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

        <SettingOption name={t("common.lang")}
          optionArray={LANGUAGE_OPTIONS}
          value={language}
          setValue={updateLanguage} />
        <SettingOption name={t("common.theme")}
          optionArray={THEME_OPTIONS}
          value={theme}
          setValue={updateTheme} />
      </div>
      <div className="flex-empty"></div>
      <input className="logout" type="button" onClick={logout} value={t("common.logout")} ></input>
    </div>
  )

}