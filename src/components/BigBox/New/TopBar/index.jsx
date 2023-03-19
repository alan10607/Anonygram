import React from 'react';
import { useDispatch } from 'react-redux';
import './index.css';
import { closeBigBox } from '../../../../redux/actions/common';
import { ICON_CLOSE } from '../../../utli/constant';

export default function TopBar({title = "", render = () => <div></div>}) {
  const dispatch = useDispatch();
  
  const doCloseBigBox = () => {
    dispatch(closeBigBox());
  }

  return (
    <div className="top-bar">
      {render()}
      <div>{title}</div>
      <div>
        <img src={ICON_CLOSE} onClick={doCloseBigBox} />
      </div>
    </div>
  )

}