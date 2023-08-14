import { useRoutes } from "react-router-dom";
import Console from "components/Console";
import Error from "components/Error";
import Login from "components/Login";
import Register from "components/Login/Register";
import Main from "components/Main";
import Forum from "components/Main/Body/Forum";
import New from "components/Main/Body/New";
import Setting from "components/Main/Body/Setting";
import './App.scss';

const routeConfig = [
  {
    path: "/",
    element: <Login />,
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
  const element = useRoutes(routeConfig)
  return (
    <div>
      {element}
      <Console />
    </div>
  )
}