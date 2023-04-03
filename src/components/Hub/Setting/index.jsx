import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetPostData } from '../../../redux/actions/post';
import { deleteJwt } from '../../../utli/jwt';
import { BIG_BOX_ID } from '../../../utli/constant';
import Bigbox from '../BigBox';
import './index.css';

export default function Setting() {
  const { isAnonyUser } = useSelector(state => ({
    isAnonyUser : state.user.isAnonyUser
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const deleteJwtAndExit = () => {
    deleteJwt()
    console.log("Logout delete jwt");
    exit();
  }

  const exit = () => {
    dispatch(resetPostData());
  }

  const boxRender = () => (
    <div id="setting">
      <div className="list">
        {isAnonyUser ?
          <Link to="/login" onClick={exit}>{t("login")}</Link> :
          <Link to="/login" onClick={deleteJwtAndExit}>{t("logout")}</Link>
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