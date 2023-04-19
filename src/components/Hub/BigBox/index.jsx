import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { closeBigBox } from '../../../redux/actions/common';
import { ICON_CLOSE } from '../../../util/constant';
import './index.scss';

export default function Bigbox({ bigBoxId, title = "",
  btnRender = () => <div></div>, boxRender = () => <div></div> }) {
  const { openBigBoxId } = useSelector(state => ({
    openBigBoxId: state.common.openBigBoxId
  }), shallowEqual);
  const dispatch = useDispatch();

  return (
    <div className={"big-box " + (openBigBoxId === bigBoxId ? "big-box-open" : "big-box-close")}>
      <div>
        <div className="top-bar">
          {btnRender()}
          <div>{title}</div>
          <div>
            <img className="icon" src={ICON_CLOSE} alt="ICON_CLOSE" 
              onClick={() => { dispatch(closeBigBox()) }} />
          </div>
        </div>
        {boxRender()}
      </div>
    </div>
  )
}