import React from 'react';
import { ICON_LOGO } from "config/constant";
import "./error.scss";

export default function Error() {
  return (
    <div id="error" className="full-screan center">
      <div>
        <img className="icon" src={ICON_LOGO} alt="ICON_LOGO" />
        <h1>PAGE NOT FOUND!!</h1>
      </div>
    </div>
  )
}