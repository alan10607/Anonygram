import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { setUser } from 'redux/actions/user';
import { ICON_LOGO, VERSION, BACKEND_API_URL, WELCOME_PAGE } from 'util/constant';
import authRequest from 'service/request/authRequest';
import './index.scss'
import { locationTo } from 'util/locationTo';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    authRequest.login(email, password).then((res) => {
      dispatch(setUser(res.id, res.username, false));
      navigate(WELCOME_PAGE);
    }).catch((e) => {
      setHint(t("login-err"));
    });
  }

  const alreadyAnonymousLogin = (event) => {
    anonymousLogin();
    // authRequest.test().then((res) => {
    //   if(res.email === ""){
    //     navigate(WELCOME_PAGE);
    //   }else{
    //     anonymousLogin()
    //   }
    // }).catch((e) => {
    //   anonymousLogin()
    // });
  }

  const anonymousLogin = () => {
    authRequest.anonymous().then((res) => {
      dispatch(setUser(res.id, res.username, true));
      navigate(WELCOME_PAGE);
    }).catch((e) => {
      setHint(t("login-anony-err"));
    });
  }

  return (
    <div className="login center">
      <div>
        <img className="icon logo" src={ICON_LOGO} alt="ICON_LOGO" />
        <div className="col-flex">
          <form onSubmit={login}>
            <input value={email}
              onChange={(event) => { setEmail(event.target.value) }}
              type="text"
              placeholder="Email"
              autoComplete="on"
              required
              autoFocus />
            <input value={password}
              onChange={(event) => { setPassword(event.target.value) }}
              type="password"
              placeholder={t("pw")}
              autoComplete="on"
              required />
            <input type="submit" value={t("login")} />
          </form>
          <div className="login-info">
            <span>{t("no-account?")} </span>
            <Link to="/register" className="info-link">{t("register")}</Link>
          </div>
          <div className="hint">{hint}</div>
          <div className="line-word">{t("or")}</div>
          <input type="button" value={t("as-anony")} onClick={alreadyAnonymousLogin} />
        </div>
        <div className="version">{VERSION}</div>
      </div>
    </div>
  )
}