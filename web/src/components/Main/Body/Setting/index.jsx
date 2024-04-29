import { JWT_TOKEN } from 'config/constant';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setConsole } from 'redux/actions/common';
import { deleteForums } from 'redux/actions/discussions';
import { setUser } from 'redux/actions/user';
import userRequest from 'service/request/userRequest';
import { useUploadImage } from 'util/imageUtil';
import { setLocalStorage } from 'util/localStorageUtil';
import useFetchUserRedux from 'util/useFetchUserRedux';
import useThrottle from 'util/useThrottle';
import HeadIcon from '../Forum/Discussion/Article/Bar/HeadIcon';
import './Setting.scss';

export default function Setting() {
  const { user: { id: userId, username, email, isAnonymous, headUrl, language, theme } } = useSelector(state => ({
    user: state.user
  }), shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const uploadImage = useUploadImage();
  const fetchUser = useFetchUserRedux();

  const LANGUAGE_OPTIONS = [{
    name: "English",
    value: "en"
  }, {
    name: "繁體中文",
    value: "zh-tw"
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
      .then(imageUrl => userRequest.updateHeadUrl(userId, imageUrl))
      .then(image => userRequest.get(userId))
      .then(user => {
        dispatch(setUser(user));
        dispatch(deleteForums());
      })
      .catch(e => dispatch(setConsole(t("tip.setting.headUrl.error"))));
  })

  const updateLanguage = useThrottle((language) => {
    if (isAnonymous) {
      dispatch(setUser({ language }))
    } else {
      userRequest.updateLanguage(userId, language)
        .then(user => dispatch(setUser({ language })))
        .catch(e => console.log("Update language failed", e));
    }
  });

  const updateTheme = useThrottle((theme) => {
    if (isAnonymous) {
      dispatch(setUser({ theme }))
      return;
    } else {
      userRequest.updateTheme(userId, theme)
        .then(user => dispatch(setUser({ theme })))
        .catch(e => console.log("Update theme failed", e))
    }
  });

  const logout = () => {
    setLocalStorage(JWT_TOKEN, null);
    fetchUser();
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
        <label className="upload-head-btn" disabled={isAnonymous}>
          <HeadIcon headUrl={headUrl} />
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
          onChange={(event) => { updateLanguage(event.target.value) }}>
          {getOptionNode(LANGUAGE_OPTIONS)}
        </select>
      </div>
      <div className="setting-option">
        <div>{t("common.theme")}</div>
        <select value={theme}
          onChange={(event) => { updateTheme(event.target.value) }}>
          {getOptionNode(THEME_OPTIONS)}
        </select>
      </div>
      <div className="flex-empty"></div>
      <input className="logout"
        type="button"
        onClick={logout}
        value={isAnonymous ? t("text.go.login") : t("common.logout")}
      ></input>
    </div>
  )

}