import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useJwt from '../../../../utli/useJwt';
import TopBar from '../New/TopBar';
import './index.css';

export default function Setting() {
  const { isAnony } = useSelector(state => ({
    username : state.user.isAnony
  }));
  const { t } = useTranslation();
  const { setJwt } = useJwt();

  const clearJwt = () => {
    setJwt("");
    console.log("Logout clear jwt");
  }

  return (
    <div id="setting">
      <TopBar/>
      <div className="list">
        {isAnony ?
          <Link to="/login"><div>{t("login")}</div></Link> :
          <Link to="/login"><div onClick={clearJwt}>{t("logout")}</div></Link>
        }
      </div>
    </div>
  )

}