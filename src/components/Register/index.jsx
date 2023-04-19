import { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ICON_LOGO } from '../../util/constant';
import authService from '../../service/request/authService';
import '../Login/index.scss'

export default function Register() {
  const emailRef = useRef();
  const userNameRef = useRef();
  const pwRef = useRef();
  const [hint, setHint] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const register = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const userName = userNameRef.current.value;
    const pw = pwRef.current.value;
    const errorStr = checkUserData(email, userName, pw);
    if (errorStr !== "") return setHint(errorStr);

    const data = { email, userName, pw };
    authService.register(data).then((res) => {
      waitThenGo(3);
    }).catch((e) => {
      setHint(t("register-err"));
    });
  }

  const checkUserData = (email, userName, pw) => {
    const emailExp = /^[\w-.]+@([\w-]+\.)+[\w-]+$/g;
    const pwExp = /^[\w-.@$!%*#?&]{6,}$/g;
    if (!emailExp.test(email)) return t("register-email-err");
    if (userName === "") return t("register-username-err");
    if (!pwExp.test(pw)) return t("register-pw-err");
    return "";
  }

  const waitThenGo = (sec) => {
    if (sec > 0) {
      setHint(t("register-success", { sec }));
      setTimeout(() => waitThenGo(sec - 1), 1000);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="login center">
      <div>
        <img className="logo icon" src={ICON_LOGO} alt="ICON_LOGO"/>
        <div className="col-flex">
          <form onSubmit={register}>
            <h2>{t("user-register")}</h2>
            <input ref={emailRef} type="text" placeholder="Email" autoComplete="off" required autoFocus />
            <input ref={userNameRef} type="text" placeholder={t("username")} autoComplete="off" required />
            <input ref={pwRef} type="password" placeholder={t("pw")} autoComplete="off" required />
            <input type="submit" value={t("register")} />
          </form>
          <div className="login-info">
            <Link to="/login" className="info-link">{t("back-to-login")}</Link>
          </div>
          <div className="hint">{hint}</div>
        </div>
      </div>
    </div>
  )
}