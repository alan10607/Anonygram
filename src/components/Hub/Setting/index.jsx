import { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetPostData } from '../../../redux/actions/post';
import { deleteJwt } from '../../../utli/jwt';
import { BIG_BOX_ID } from '../../../utli/constant';
import Bigbox from '../BigBox';
import './index.css';

export default function Setting() {
  const langRef = useRef();
  const colorRef = useRef();
  const { isAnonyUser } = useSelector(state => ({
    isAnonyUser : state.user.isAnonyUser
  }));
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    langRef.current.value = i18n.language;
  }, [i18n.language]);

  const deleteJwtAndExit = () => {
    deleteJwt()
    console.log("Logout delete jwt");
    exit();
  }

  const exit = () => {
    dispatch(resetPostData());
  }

  const changeLang = () => {
    i18n.changeLanguage(langRef.current.value);
  }

  const changeColor = () => {
    const rootStyle = window.getComputedStyle(document.documentElement);
    const root = document.documentElement;
    const color = colorRef.current.value;
    const v = `--b-bg`;
    root.style.setProperty("--bg", rootStyle.getPropertyValue(v));
  }

  const boxRender = () => (
    <div id="setting">
      <div className="list">
        <div>
          {isAnonyUser ?
            <Link to="/login" onClick={exit}>{t("login")}</Link> :
            <Link to="/login" onClick={deleteJwtAndExit}>{t("logout")}</Link>
          }
        </div>
        <div className="lang">
          <div>{t("lang")}</div>
          <select ref={langRef} onChange={changeLang}>
            <option value="en">English</option>
            <option value="zh-TW">繁體中文</option>
          </select>
        </div>
        <div className="lang">
          <div>{t("lang")}</div>
          <select ref={colorRef} onChange={changeColor}>
            <option value="b">black</option>
            <option value="w">white</option>
          </select>
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