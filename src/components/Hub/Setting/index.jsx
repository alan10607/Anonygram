import { useEffect, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resetAllData } from '../../../redux/actions/post';
import { deleteJwt } from '../../../service/jwt';
import { useLang, useTheme } from '../../../util/localSetting';
import { BIG_BOX_ID } from '../../../util/constant';
import Bigbox from '../BigBox';
import './index.scss';

export default function Setting() {
  const langRef = useRef();
  const themeRef = useRef();
  const [lang, setLang] = useLang();
  const [theme, setTheme] = useTheme();
  const { isAnonyUser } = useSelector(state => ({
    isAnonyUser: state.user.isAnonyUser
  }), shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    langRef.current.value = lang;
  }, [lang]);

  useEffect(() => {
    themeRef.current.value = theme;
  }, [theme]);

  const exit = () => {
    if (!isAnonyUser) {
      deleteJwt();
      console.log("Logout delete jwt");
    }
    dispatch(resetAllData());
    navigate("/login");
  }

  const boxRender = () => (
    <div id="setting">
      <div className="list">
        <div>
          <div>{t("lang")}</div>
          <select ref={langRef} onChange={(event) => { setLang(event.target.value) }}>
            <option value="en">English</option>
            <option value="zh-TW">繁體中文</option>
          </select>
        </div>
        <div>
          <div>{t("theme")}</div>
          <select ref={themeRef} onChange={(event) => { setTheme(event.target.value) }}>
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

  return (
    <Bigbox
      bigBoxId={BIG_BOX_ID.SETTING}
      title=""
      btnRender={() => <div></div>}
      boxRender={boxRender}
    />
  )
}