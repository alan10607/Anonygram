import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { BIG_BOX_ID, JWT_TOKEN } from '../../../utli/constant';
import useJwt from '../../../utli/useJwt';
import Bigbox from '../BigBox';
import './index.css';

export default function Setting() {
  const { t } = useTranslation();
  const { setJwt, payload : { isAnonymous } } = useJwt();

  const clearJwt = () => {
    debugger
    localStorage.setItem(JWT_TOKEN, null);
    console.log("Logout clear jwt");
  }

  const boxRender = () => (
    <div id="setting">
      <div className="list">
        {isAnonymous ?
          <Link to="/login"><div>{t("login")}</div></Link> :
          <Link to="/login"><div onClick={clearJwt}>{t("logout")}</div></Link>
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