import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ICON_LOGO } from 'util/constant';
import authRequest from 'service/request/authRequest';
import '../Login/index.scss'

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const register = (event) => {
    event.preventDefault();

    const errorStr = checkUserData(username, email, password);
    if (errorStr !== "") {
      return setHint(errorStr);
    }

    authRequest.register(username, email, password).then((res) => {
      waitThenGo(3);
    }).catch((e) => {
      setHint(t("tip.register.error"));
    });
  }

  const checkUserData = (username, email, password) => {
    const emailExp = /^[\w-.]+@([\w-]+\.)+[\w-]+$/g;
    const pwExp = /^[\w-.@$!%*#?&]{6,}$/g;
    if (username === "") return t("tip.register.username.error");
    if (!emailExp.test(email)) return t("tip.register.email.error");
    if (!pwExp.test(password)) return t("tip.register.password.error");
    return "";
  }

  const waitThenGo = (sec) => {
    if (sec > 0) {
      setHint(t("tip.register.success", { sec }));
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
            <h2>{t("text.register.title")}</h2>
            <input value={username}
              onChange={(event) => { setUsername(event.target.value) }}
              type="text"
              placeholder={t("common.username")}
              autoComplete="off"
              required />
            <input value={email}
              onChange={(event) => { setEmail(event.target.value) }}
              type="text"
              placeholder={t("common.email")}
              autoComplete="off"
              required
              autoFocus />
            <input value={password}
              onChange={(event) => { setPassword(event.target.value) }}
              type="password"
              placeholder={t("common.password")}
              autoComplete="off"
              required />
            <input type="submit" value={t("common.register")} />
          </form>
          <div className="login-info">
            <Link to="/login" className="info-link">{t("text.register.backToLogin")}</Link>
          </div>
          <div className="hint">{hint}</div>
        </div>
      </div>
    </div>
  )
}