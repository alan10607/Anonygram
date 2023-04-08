import { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { resetPostData } from '../../../redux/actions/post';
import { deleteJwt } from '../../../utli/jwt';
import { BIG_BOX_ID } from '../../../utli/constant';
import Bigbox from '../BigBox';
import './index.scss';

export default function Setting() {
  const langRef = useRef();
  const themeRef = useRef();
  const { isAnonyUser } = useSelector(state => ({
    isAnonyUser: state.user.isAnonyUser
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    langRef.current.value = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    changeTheme();
  }, []);

  const exit = () => {
    if (!isAnonyUser) {
      deleteJwt()
      console.log("Logout delete jwt");
    }
    dispatch(resetPostData());
    navigate("/login");
  }

  const changeLang = () => {
    i18n.changeLanguage(langRef.current.value);
  }

  const styleName = [
    "bg-body",
    "bg-box",
    "bg-setting",
    "bg-btn",
    "bg-login-btn",
    "color-normal",
    "color-mid",
    "color-light",
    "icon-filter"
  ];

  const changeTheme = () => {
    const root = document.documentElement;
    const rootStyle = window.getComputedStyle(root);
    const theme = themeRef.current.value;
    for (let name of styleName) {
      const value = rootStyle.getPropertyValue(`--${theme}-${name}`);
      root.style.setProperty(`--${name}`, value);
      console.log(`--${name}`, value)
    }
  }

  const boxRender = () => (
    <div id="setting">
      <div className="list">
        <div>
          <div>{t("lang")}</div>
          <select ref={langRef} onChange={changeLang}>
            <option value="en">English</option>
            <option value="zh-TW">繁體中文</option>
          </select>
        </div>
        <div>
          <div>{t("theme")}</div>
          <select ref={themeRef} onChange={changeTheme}>
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