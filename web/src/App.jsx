import Console from "components/Console";
import Error from "components/Error";
import Login from "components/Login";
import Register from "components/Login/Register";
import Main from "components/Main";
import Forum from "components/Main/Body/Forum";
import New from "components/Main/Body/New";
import Setting from "components/Main/Body/Setting";
import { JWT_TOKEN } from "config/constant";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRoutes, Navigate } from "react-router-dom";
import { setConsole } from "redux/actions/common";
import { setUser, deleteUser, putUser } from "redux/actions/user";
import { locationTo } from "util/locationUtil";
import tokenRequest from "service/request/tokenRequest";
import './App.scss';
import userRequest from "service/request/userRequest";
import useLocalStorage from "util/localStorageUtil";
import { validate } from "uuid";

const routeConfig = [
  {
    path: "/",
    element: <Navigate to="/forum/index" replace />
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
  const { userId } = useSelector(state => ({
    userId: state.user.id
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(deleteUser());

    tokenRequest.get()
      .then(user => validate(user.id) ?
        userRequest.get(user.id) :
        Promise.resolve(user))
      .then(user => dispatch(setUser(user)))
      .catch(e => console.info("User set as anonymous"))
  }, []);

  const element = useRoutes(routeConfig);
  return (
    <div>
      {element}
      <Console />
    </div>
  )
}