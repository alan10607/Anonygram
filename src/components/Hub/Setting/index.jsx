import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BIG_BOX_ID, JWT_TOKEN } from '../../../utli/constant';
import useJwt from '../../../utli/useJwt';
import Bigbox from '../BigBox';
import './index.css';
import { closeBigBox } from '../../../redux/actions/common';
import { resetPostData } from '../../../redux/actions/post';

export default function Setting() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { setJwt, payload : { isAnonymous } } = useJwt();

  const clearJwtAndExit = () => {
    localStorage.setItem(JWT_TOKEN, null);
    console.log("Logout clear jwt");
    exit();
  }

  const exit = () => {
    dispatch(resetPostData());
  }

  const boxRender = () => (
    <div id="setting">
      <div className="list">
        {isAnonymous ?
          <Link to="/login" onClick={exit}>{t("login")}</Link> :
          <Link to="/login" onClick={clearJwtAndExit}>{t("logout")}</Link>
        }
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