import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { userApi } from '../../utli/api';
import { ICON_LOGO } from '../../utli/constant';
import useJwt from '../../utli/useJwt';
import './index.css'

export default function Login() {
  const [done, setDown] = useState(false);
  const emailRef = useRef("");
  const pwRef = useRef("");
  const [hint, setHint] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { jwt, setJwt } = useJwt();

  useEffect(() => {
    if (done) navigate("/hub");
  }, [done]);

  const doLogin = (event) => {
    event.preventDefault();

    const data = {
      email: emailRef.current.value,
      pw: pwRef.current.value,
    }

    userApi("login", data).then((res) => {
      setJwt(res.token);
      setDown(true);
    }).catch(() => {
      setHint(t("login-err"));
    });
  }

  const doLoginAnony = (event) => {
    event.preventDefault();
    userApi("anony", {}).then((res) => {
      setJwt(res.token);
      setDown(true);
    }).catch(() => { });
  }

  return (
    <div className="login center">
      <div>
        <img className="logo" src={ICON_LOGO} />
        <div className="col-flex">
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
    </div>
  )
}