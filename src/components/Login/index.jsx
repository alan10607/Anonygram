import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { saveUserData } from '../../redux/actions/user';
import { userApi } from '../../utli/api';
import { ICON_LOGO } from '../../utli/constant';
import useJwt from '../../utli/useJwt';
import './index.css'

export default function Login() {
  const emailRef = useRef("");
  const pwRef = useRef("");
  const [hint, setHint] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [jwtToken, setJwtToken] = useJwt();

  const doLogin = (event) => {
    event.preventDefault();

    const data = {
      email: emailRef.current.value,
      pw: pwRef.current.value,
    }

    userApi("login", data).then((res) => {
      setJwtToken(res.token);
      dispatch(saveUserData(res));
      navigate("/hub");
    }).catch(() => {
      setHint(t("login-err"));
    });
  }

  const doLoginAnony = (event) => {
    event.preventDefault();
    userApi("loginAnonymity", {}).then((res) => {
      setJwtToken(res.jwtToken);
      navigate("/hub");
    }).catch(() => {});
  }

  return (
    <div className="login center">
      <div>
        <img className="logo" src={ICON_LOGO} />
        <form onSubmit={doLogin}>
          <input ref={emailRef} type="text" placeholder="Email" required autoFocus />
          <input ref={pwRef} type="password" placeholder={t("pw")} required />
          {/* <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> */}
          <input type="submit" value={t("submit")} />
        </form>
        <p className="info">
          <span>{t("no-account?")}</span>
          <a className="register" href="register">{t("register")}</a>
        </p>
        <p className="hint">{hint}</p>
        <div className="line-word">{t("or")}</div>
        <input type="button" value={t("as-anony")} onClick={doLoginAnony} />
      </div>
    </div>
  )
}