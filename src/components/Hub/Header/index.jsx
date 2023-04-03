import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showBigBox } from '../../../redux/actions/common';
import { ICON_ADD, BIG_BOX_ID, ICON_OPTION } from '../../../utli/constant';
import "./index.css";

export default function Header() {
  const { username, isAnonyUser } = useSelector(state => ({
    username : state.user.username,
    isAnonyUser : state.user.isAnonyUser
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = (isAnonyUser ? `${t("anony")} ` : "") + username;

  return (
    <div id="header">
      <div>
        <div className="user">{user}</div>
        <img src={ICON_ADD} onClick={() => { dispatch(showBigBox(BIG_BOX_ID.NEW)) }} />
        <img src={ICON_OPTION} onClick={() => { dispatch(showBigBox(BIG_BOX_ID.SETTING)) }} />
      </div>
    </div>
  )
}