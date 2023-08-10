import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './setting.scss';
import { ICON_USER, LANGUAGE_OPTIONS, THEME_OPTIONS } from 'util/constant';
import SettingOption from './SettingOption';
import { deleteUser, setLanguage, setTheme } from 'redux/actions/user';
import useThrottle from 'util/useThrottle';
import { uploadImageFromTargetFiles } from 'util/image';
import ValidationError from 'util/validationError';
import { setConsole } from 'redux/actions/common';

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

  const uploadHead = useThrottle((event) => {
    uploadImageFromTargetFiles(event.target.files).then((res) => {
      const imgUrl = res.imgUrl;
      console.log("Image url", imgUrl);
      // dispatch(addReplyHtml(id, `<img src="${imgUrl}" alt="${imgUrl}"/>`));
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
      <input className="logout" type="button" onClick={logout} value={t("logout")} ></input>
    </div>
  )

}