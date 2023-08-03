import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resetAllData } from '../../../../redux/actions/post';
import { useLocalSetting, useLang, useTheme } from '../../../../util/localSetting';
import './index.scss';

export default function Setting() {
  const [{ lang, theme }, { setJwt, setLang, setTheme }] = useLocalSetting()
  const { isAnonyUser } = useSelector(state => ({
    isAnonyUser: state.user.isAnonyUser
  }), shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const exit = () => {
    setJwt({});
    dispatch(resetAllData());
    navigate("/login");
  }

  return (
    <div id="setting">
      <div className="list">
        <div>
          <div>{t("lang")}</div>
          <select value={lang} onChange={(event) => { setLang(event.target.value) }}>
            <option value="en">English</option>
            <option value="zh-TW">繁體中文</option>
          </select>
        </div>
        <div>
          <div>{t("theme")}</div>
          <select value={theme} onChange={(event) => { setTheme(event.target.value) }}>
            <option value="light">{t("theme-light")}</option>
            <option value="dark">{t("theme-dark")}</option>
          </select>
        </div>
        <div className="flex-empty"></div>
        <div onClick={exit}>
          <div>{isAnonyUser ? t("login") : t("logout")}</div>
        </div>
      </div>
    </div>
  )

}