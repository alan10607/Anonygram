import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import New from './New';
import Setting from './Setting';
import './index.css';

export default function BigBox() {
  const { isOpenBigBox } = useSelector(state => ({
    isOpenBigBox : state.common.isOpenBigBox
  }));

  return (
    <div id="big-box" className={isOpenBigBox ? "big-box-open" : "big-box-close"}>

        {/* <Route path='/hub/new' element={<New />} />
        <Route exact path='/hub/setting' element={<Setting />} /> */}

    </div>
  )

}