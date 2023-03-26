import React from 'react';
import { ICON_LOGO } from "../../utli/constant";
import "./index.css";

export default Error = () => {
  return (
    <div id="error" class="full-screan center">
      <div>
        <div>404</div>
        <img src={ICON_LOGO} />
      </div>
    </div>
  )
}