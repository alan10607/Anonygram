import { ICON_LOGO, VERSION, WELCOME_PAGE } from "config/constant";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "redux/actions/user";
import authRequest from "service/request/tokenRequest";
import './Login.scss';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    authRequest.login(email, password)
      .then(user => {
        dispatch(setUser(user));
        navigate(WELCOME_PAGE);
      })
      .catch(e => setHint(t("tip.login.error")));
  }

  const anonymousLogin = (event) => {
    navigate(WELCOME_PAGE);
  };

  return (
    <div className="login center">
      <div>
        <img className="icon logo" src={ICON_LOGO} alt="ICON_LOGO" />
        <div className="col-flex">
          <form onSubmit={login}>
            <input value={email}
              onChange={(event) => { setEmail(event.target.value) }}
              type="text"
              placeholder={t("common.email")}
              autoComplete="on"
              required
              autoFocus />
            <input value={password}
              onChange={(event) => { setPassword(event.target.value) }}
              type="password"
              placeholder={t("common.password")}
              autoComplete="on"
              required />
            <input type="submit" value={t("common.login")} />
          </form>
          <div className="login-info">
            <span>{t("text.login.noAccountYet")} </span>
            <Link to="/register" className="info-link">{t("common.register")}</Link>
          </div>
          <div className="hint">{hint}</div>
          <div className="line-word">{t("text.login.or")}</div>
          <input type="button" value={t("common.anonymousLogin")} onClick={anonymousLogin} />
        </div>
        <div className="version">{VERSION}</div>
      </div>
    </div>
  )
}