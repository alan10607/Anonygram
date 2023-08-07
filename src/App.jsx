import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Login/Register';
import Error from './components/Error'
import Console from './components/Console';
import './App.scss';
import Forum from "components/Main/Body/Forum";
import New from "components/Main/Body/New";
import Setting from "components/Main/Body/Setting";

const routeConfig = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/error',
    element: <Error />
  },
  {
    path: '/forum',
    element: <Main />,
    children: [
      { path: '/forum/', element: <Forum /> },
      { path: '/forum/new', element: <New /> },
      { path: '/forum/setting', element: <Setting /> }
    ],
  },
  {
    path: '*',
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