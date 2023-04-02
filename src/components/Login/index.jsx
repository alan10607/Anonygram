import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Service from '../../service';
import { ICON_LOGO } from '../../utli/constant';
import Auth from '../../service/auth';
import useJwt from '../../utli/useJwt';
import usePrevious from '../../utli/usePrevious';
import './index.css'

export default function Login() {
  const emailRef = useRef();
  const pwRef = useRef();
  const [hint, setHint] = useState("");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { payload, setJwt, valid } = useJwt();

  //取得新的jwt後跳轉
  useEffect(() => {
    if (done){
      console.log("Login check Jwt", payload);
      navigate("/hub");
    }
  }, [done]);

  const login = (event) => {
    event.preventDefault();

    const data = {
      email: emailRef.current.value,
      pw: pwRef.current.value,
    };
    Service.auth.login(data).then((res) => {
      setJwt(res.token);
      setDone(true);
    }).catch(() => {
      setHint(t("login-err"));
    });
  }

  const loginAnony = (event) => {
    event.preventDefault();

    if(valid){
      setDone(true);
    }else{
      Service.auth.anony().then((res) => {
        setJwt(res.token);
        setDone(true);
      }).catch(() => {
        setHint(t("login-anony-err"));
      });
    }
  }

  return (
    <div className="login center">
      <div>
        <img className="logo" src={ICON_LOGO} />
        <div className="col-flex">
          <form onSubmit={login}>
            <input ref={emailRef} type="text" placeholder="Email" autoComplete="on" required autoFocus />
            <input ref={pwRef} type="password" placeholder={t("pw")} autoComplete="on" required />
            {/* <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> */}
            <input type="submit" value={t("login")} />
          </form>
          <p className="info">
            <span>{t("no-account?")} </span>
            <Link to="/register" className="register">{t("register")}</Link>
          </p>
          <p className="hint">{hint}</p>
          <div className="line-word">{t("or")}</div>
          <input type="button" value={t("as-anony")} onClick={loginAnony} />
        </div>
      </div>
    </div>
  )
}