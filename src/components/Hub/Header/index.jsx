import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ICON_ADD, ICON_OPTION } from '../../../utli/constant';
import { showBigBox } from '../../../redux/actions/common';
import "./index.css";
import useJwt from '../../../utli/useJwt';

export default function Header() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { payload : { sub : username, isAnonymous}  } = useJwt();
  const user = (isAnonymous ? `${t("anony")} ` : "") + username;
  
  return (
    <div id="header">
      <div className="user">{user}</div>
      <Link to="/hub/new"><img src={ICON_ADD} onClick={() => { dispatch(showBigBox())} }/></Link>
      <Link to="/hub/setting"><img src={ICON_OPTION} onClick={() => { dispatch(showBigBox()) }}/></Link>
      <button className="toggle-btn">
        <div></div>
        <div></div>
        <div></div>
		  </button>
    </div>
  )
}