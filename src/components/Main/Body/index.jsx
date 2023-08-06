import { Routes, Route, Outlet } from "react-router-dom";
import Forum from "./Forum";
import New from "./New";
// import Setting from "./Setting";
import './index.scss';
import Main from "..";


export default function Body() {
  return (
    <div>
      <Outlet />
    </div>
  )
}