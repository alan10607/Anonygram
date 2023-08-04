import { Routes, Route } from "react-router-dom";
import Forum from "./Forum";
// import New from "./New";
import Setting from "./Setting";
import './index.scss';


export default function Body() {
  return (
    <div><Forum />
      <Routes>
        <Route exact strict path='/forum' element={<Forum />} />
        {/* <Route exact strict path='/forum/new' element={<New />} /> */}
        <Route exact strict path='/forum/setting' element={<Setting />} />
      </Routes>
    </div>
  )
}