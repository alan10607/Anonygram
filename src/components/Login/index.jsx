import { useState, useEffect, useRef } from 'react';
import { axiosInstance, userApi } from '../../utli/api';
import { useLocalStorage } from '../../utli/useLocalStorage';
import { setCookie } from '../../utli/cookie';
import { LOGIN_TOKEN } from '../../utli/constant';

export default function Login() {
  const userRef = useRef("");
  const pwRef = useRef("");
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [jwtToken, setJwtToken] = useLocalStorage("ag-jwt");

  const doLogin = (event) => {
    event.preventDefault();

    const data = {
      username : userRef.current.value,
      password : pwRef.current.value,
    }
    userApi("login", data).then((res) => {
      console.log(res);
      setJwtToken(res.jwtToken);
    }).catch((e) => {
      console.log(e);
    });
  }


  return (
    <div id="login" className="center">
      <div>
        <img className="logo" th:src="@{~/pic/logo.svg}" />
        <form onSummit={doLogin} method="post" action="loginProcessing">
          <input res={userRef} id="username" type="text" placeholder="Email" required autofocus/>
          <input res={pwRef} id="password" type="password" placeholder="密碼" required/>
          <input type="hidden" th:if="${_csrf != null}" name="${_csrf.parameterName}" value="${_csrf.token}" />
          <input type="submit" value="登入" />
        </form>
        <p className="info">
          <span>還沒有帳號?</span>
          <a className="register" href="register">註冊</a>
        </p>
        <p className="error">
          {error && <span th:if="${param.error != null}">Email或用戶密碼錯誤</span>}
          {/* <span th:if="${param.logout != null}">登出成功</span> */}
        </p>
        <div className="line-word">或</div>
        <input type="button" value="以匿名登入" onclick="toHub();" />
      </div>
    </div>
  )
}