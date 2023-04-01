import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeBigBox } from '../../../redux/actions/common';
import { ICON_CLOSE } from '../../../utli/constant';
import './index.css';

export default function Bigbox({ bigBoxId, title = "", 
  btnRender = () => <div></div>, boxRender = () => <div></div> }) {
  const { openBigBoxId } = useSelector(state => ({
    openBigBoxId : state.common.openBigBoxId
  }));
  const dispatch = useDispatch();

  return (
    <div className={"big-box " + (openBigBoxId == bigBoxId ? "big-box-open" : "big-box-close")}>
      <div className="top-bar">
        {btnRender()}
        <div>{title}</div>
        <div>
          <img src={ICON_CLOSE} onClick={() => { dispatch(closeBigBox()) }} />
        </div>
      </div>
      {boxRender()}
    </div>
  )

}