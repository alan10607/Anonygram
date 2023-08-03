import { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { setUser } from 'redux/actions/user';
import { ICON_LOGO, VERSION, BACKEND_API_URL } from 'util/constant';
import { locationTo } from 'util/locationTo';
import authRequest from 'service/request/authRequest';
import './index.scss'

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hint, setHint] = useState("");
  const [logged, setlogged] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId } = useSelector(state => ({
    userId: state.user.id
  }), shallowEqual);

  useEffect(() => {//For testing, check user SSL confirmation
    authRequest.ssl().then((res) => { })
      .catch((e) => {//If does not conform SSL then redirect to the backend
        const sslUrl = `${BACKEND_API_URL}/ssl?callbackUrl=${window.location.href}`;
        console.log("Redirect backend for ssl", sslUrl)
        locationTo(sslUrl);
      });
  }, []);

  useEffect(() => {//取得新的jwt後跳轉
    if (logged) {
      navigate("/hub");
    }
  }, [logged]);

  const login = (event) => {
    event.preventDefault();

    authRequest.login(email, password).then((res) => {
      dispatch(setUser(res.id, res.username, false, res.tokenMaxAge));
      navigate("/hub");
    }).catch((e) => {
      setHint(t("login-err"));
    });
  }

  const loginAnonymous = (event) => {
    event.preventDefault();

    if (userId) {
      navigate("/hub");
      return;
    }

    authRequest.anonymous().then((res) => {
      dispatch(setUser(res.id, res.username, true, res.tokenMaxAge));
      navigate("/hub");
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
          <input type="button" value={t("as-anony")} onClick={loginAnonymous} />
        </div>
        <div className="version">{VERSION}</div>
      </div>
    </div>
  )
}