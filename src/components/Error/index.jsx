import React from 'react';
import { ICON_LOGO } from "../../utli/constant";
import "./index.css";

export default function Error() {
  return (
    <div id="error" className="full-screan center">
      <div>
        <img src={ICON_LOGO} alt="logo" />
        <h1>PAGE NOT FOUND!!</h1>
      </div>
    </div>
  )
}