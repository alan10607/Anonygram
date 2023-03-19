import React from 'react';
import TopBar from '../New/TopBar';
import './index.css';

export default function Setting() {
  return (
    <div id="setting">
      <TopBar/>
      <div className="list">
        <div onclick="logout();">登出</div>
        <div onclick="login();">登入</div>
      </div>
    </div>
  )

}