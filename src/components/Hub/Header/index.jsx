import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showBigBox } from '../../../redux/actions/common';
import { ICON_ADD, BIG_BOX_ID, ICON_OPTION } from '../../../utli/constant';
import "./index.scss";

export default function Header() {
  const { username, isAnonyUser } = useSelector(state => ({
    username : state.user.username,
    isAnonyUser : state.user.isAnonyUser
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = (isAnonyUser ? "#" : "") + username;

  return (
    <div id="header">
      <div>
        <div className="user">{user}</div>
        <img className="icon" src={ICON_ADD} onClick={() => { dispatch(showBigBox(BIG_BOX_ID.NEW)) }} />
        <img className="icon" src={ICON_OPTION} onClick={() => { dispatch(showBigBox(BIG_BOX_ID.SETTING)) }} />
      </div>
    </div>
  )
}