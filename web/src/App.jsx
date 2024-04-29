import Console from "components/Console";
import Error from "components/Error";
import Login from "components/Login";
import Register from "components/Login/Register";
import Main from "components/Main";
import Forum from "components/Main/Body/Forum";
import New from "components/Main/Body/New";
import Query from "components/Main/Body/Query";
import Setting from "components/Main/Body/Setting";
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import useFetchUserRedux from "util/useFetchUserRedux";
import './App.scss';

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
        path: "/forum/query",
        element: <Query />
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
  const fetchUser = useFetchUserRedux();

  useEffect(() => {
    fetchUser();
  }, []);

  const element = useRoutes(routeConfig);
  return (
    <div>
      {element}
      <Console />
    </div>
  )
}