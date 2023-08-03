import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ICON_LOGO } from 'util/constant';
import authRequest from 'service/request/authRequest';
import '../Login/index.scss'

export default function Register() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [hint, setHint] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const register = (event) => {
    event.preventDefault();

    const errorStr = checkUserData(email, username, password);
    if (errorStr !== "") {
      return setHint(errorStr);
    }

    authRequest.register(email, username, password).then((res) => {
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
        <img className="logo icon" src={ICON_LOGO} alt="ICON_LOGO" />
        <div className="col-flex">
          <form onSubmit={register}>
            <h2>{t("user-register")}</h2>
            <input value={email}
              onChange={(event) => { setEmail(event.target.value) }}
              type="text"
              placeholder="Email"
              autoComplete="off"
              required
              autoFocus />
            <input value={username}
              onChange={(event) => { setUsername(event.target.value) }}
              type="text"
              placeholder={t("username")}
              autoComplete="off"
              required />
            <input value={password}
              onChange={(event) => { setPassword(event.target.value) }}
              type="password"
              placeholder={t("pw")}
              autoComplete="off"
              required />
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