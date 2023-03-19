import { ICON_ADD, ICON_OPTION } from '../../utli/constant';
import { Link } from "react-router-dom";
import useShowBigBox from '../../utli/useShowBigBox';
import "./index.css";

export default function Header() {
  const showBigBox = useShowBigBox();
  
  const doShowBigBox = () => {
    showBigBox(true);
  }

  return (
    <div id="header">
      <div className="user">
          <div if="${userName == null}" text="'匿名 (' + ${userId} + ')'"></div>
          <div if="${userName != null}" text="${userName}"></div>
      </div>
      <Link to="/new"><img src={ICON_ADD} onClick={doShowBigBox}/></Link>
      <Link to="/setting"><img src={ICON_OPTION} onClick={doShowBigBox}/></Link>
    </div>
  )
}