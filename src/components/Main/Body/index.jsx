import Forum from "./Forum";
import './index.scss';


export default function Body() {
  return (
    <div>
      <Routes>
        <Route exact strict path='/forum' element={<Forum />} />
        {/* <Route exact strict path='/forum/new' element={<New />} />
        <Route exact strict path='/forum/setting' element={<Setting />} /> */}
      </Routes>
    </div>
  )
}