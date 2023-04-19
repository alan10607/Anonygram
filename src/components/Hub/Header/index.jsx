import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { showBigBox } from '../../../redux/actions/common';
import { replySetId } from '../../../redux/actions/reply';
import { ICON_ADD, BIG_BOX_ID, ICON_OPTION } from '../../../util/constant';
import "./index.scss";

export default function Header() {
  const { username, isAnonyUser } = useSelector(state => ({
    username : state.user.username,
    isAnonyUser : state.user.isAnonyUser
  }), shallowEqual);
  const dispatch = useDispatch();
  const user = (isAnonyUser ? "#" : "") + username;

  return (
    <div id="header">
      <div>
        <div className="user">{user}</div>
        <img className="icon" src={ICON_ADD} alt="ICON_ADD" onClick={() => { 
            dispatch(showBigBox(BIG_BOX_ID.NEW)) 
          }} />
        <img className="icon" src={ICON_OPTION} alt="ICON_OPTION" onClick={() => { 
            dispatch(showBigBox(BIG_BOX_ID.SETTING));
            dispatch(replySetId("new"))
          }} />
      </div>
    </div>
  )
}