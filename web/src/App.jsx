import Console from "components/Console";
import Error from "components/Error";
import Login from "components/Login";
import Register from "components/Login/Register";
import Main from "components/Main";
import Forum from "components/Main/Body/Forum";
import New from "components/Main/Body/New";
import Setting from "components/Main/Body/Setting";
import { BACKEND_API_URL } from "config/constant";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRoutes, Navigate } from "react-router-dom";
import { setConsole } from "redux/actions/common";
import { setUser } from "redux/actions/user";
import { locationTo } from "util/locationUtil";
import authRequest from "service/request/authRequest";
import otherRequest from "service/request/otherRequest";
import './App.scss';

const routeConfig = [
  {
    path: "/",
    element: <Navigate to="/forum/index" replace/>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/error",
    element: <Error />
  },
  {
    path: "/forum",
    element: <Main />,
    children: [
      {
        path: "/forum/index",
        element: <Forum />
      },
      {
        path: "/forum/new",
        element: <New />
      },
      {
        path: "/forum/setting",
        element: <Setting />
      }
    ],
  },
  {
    path: "*",
    element: <Error />
  }
]

export default function App() {
  const { userId, language, theme } = useSelector(state => ({
    userId: state.user.id,
    language: state.user.language,
    theme: state.user.theme
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {//For testing, check user SSL confirmation
    otherRequest.ssl()
      .then(() => {})
      .catch(e => {//If does not conform SSL then redirect to the backend
        const sslUrl = `${BACKEND_API_URL}/ssl?callbackUrl=${window.location.href}`;
        console.log("Redirect backend for ssl", sslUrl)
        locationTo(sslUrl);
      });
  }, []);

  useEffect(() => {
    if (!userId) {
      authRequest.anonymous()
      .then(user => {
        dispatch(setUser(user))
        console.log("Auto anonymous login userId:", user.id);
      })
      .catch(e => dispatch(setConsole(t("tip.login.anonymous.error"))))
    }else{
      const userPreference = { language, theme };
      dispatch(setUser(userPreference));
      console.log("Login userId:", userId, ", user preference:", userPreference);
    }
  }, [userId]);

  const element = useRoutes(routeConfig);
  return (
    <div>
      {element}
      <Console />
    </div>
  )
}