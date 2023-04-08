import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { setJwt, isJwtValid } from '../../utli/jwt';
import { locationTo } from '../../utli/reolad';
import { ICON_LOGO, VERSION, BACKEND_API_URL } from '../../utli/constant';
import authService from '../../service/authService';
import './index.scss'

export default function Login() {
  const emailRef = useRef();
  const pwRef = useRef();
  const [hint, setHint] = useState("");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {//測試用, 確認後台ssl
    authService.testSsl().then((res) => {})
    .catch((e) => {
      //跳轉到後台後再返回
      const sslUrl = `${BACKEND_API_URL}ssl?callbackUrl=${window.location.href}`;
      console.log("Check ssl move to:", sslUrl)
      locationTo(sslUrl);
    });
  }, []);

  useEffect(() => {//取得新的jwt後跳轉
    if (done){
      navigate("/hub");
    }
  }, [done]);

  const login = (event) => {
    event.preventDefault();

    const data = {
      email: emailRef.current.value,
      pw: pwRef.current.value,
    };
    authService.login(data).then((res) => {
      setJwt(res.token);
      setDone(true);
    }).catch(() => {
      setHint(t("login-err"));
    });
  }

  const loginAnony = (event) => {
    event.preventDefault();

    if(isJwtValid()){
      setDone(true);
    }else{
      authService.anony().then((res) => {
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
        <img className="icon logo" src={ICON_LOGO} />
        <div className="col-flex">
          <form onSubmit={login}>
            <input ref={emailRef} type="text" placeholder="Email" autoComplete="on" required autoFocus />
            <input ref={pwRef} type="password" placeholder={t("pw")} autoComplete="on" required />
            {/* <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> */}
            <input type="submit" value={t("login")} />
          </form>
          <p className="info">
            <span>{t("no-account?")} </span>
            <Link to="/register" className="info-link">{t("register")}</Link>
          </p>
          <p className="hint">{hint}</p>
          <div className="line-word">{t("or")}</div>
          <input type="button" value={t("as-anony")} onClick={loginAnony} />
        </div>
        <div className="version">{VERSION}</div>
      </div>
    </div>
  )
}