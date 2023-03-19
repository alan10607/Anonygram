import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import New from './New';
import Setting from './Setting';
import './index.css';

export default function BigBox() {
  const { isOpenBigBox } = useSelector(state => ({
    isOpenBigBox : state.common.isOpenBigBox
  }));

  return (
    <div id="big-box" className={isOpenBigBox ? "big-box-open" : "big-box-close"}>
      <Switch>
        <Route path="/new">
          <New/>
        </Route>
        <Route path="/setting">
          <Setting/>
        </Route>
      </Switch>
    </div>
  )

}