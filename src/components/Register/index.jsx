import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { userApi } from '../../utli/api';
import useJwt from '../../utli/useJwt';
import { ICON_LOGO } from '../../utli/constant';
import '../Login/index.css'

export default function Register() {
  const emailRef = useRef("");
  const userNameRef = useRef("");
  const pwRef = useRef("");
  const [hint, setHint] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [jwtToken, setJwtToken] = useJwt();

  const doRegister = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const userName = userNameRef.current.value;
    const pw = pwRef.current.value;
    const errorStr = checkUserData(email, userName, pw);
    if (errorStr != "") {
      setHint(errorStr);
      return;
    }

    const data = { email, userName, pw };
    userApi("register", data).then((res) => {
      setJwtToken(res.jwtToken);
      waitThenGo(3);
    }).catch(() => {
      setHint(t("register-err"));
    });
  }

  const checkUserData = (email, userName, pw) => {
    const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/g;
    const pwExp = /^[\w-.@$!%*#?&]{6,}$/g;
    if (!emailExp.test(email)) return t("register-email-err");
    if (userName == "") return t("register-username-err");
    if (!pwExp.test(pw)) return t("register-pw-err");
    return "";
  }

  const waitThenGo = (sec) => {
    if (sec > 0) {
      setHint(t("register-success", {sec}));
      setTimeout(waitThenGo(sec - 1), 1000);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="login center">
      <div>
        <img className="logo" src={ICON_LOGO} />
        <form onSummit={doRegister}>
          <h4>{t("user-register")}</h4>
          <input res={emailRef} type="text" placeholder="Email" required autofocus />
          <input res={userNameRef} type="text" placeholder={t("username")} required />
          <input res={pwRef} type="password" placeholder={t("pw")} required />
          <input type="button" value={t("register")} />
        </form>
        <p className="hint">{hint}</p>
      </div>
    </div>
  )
}