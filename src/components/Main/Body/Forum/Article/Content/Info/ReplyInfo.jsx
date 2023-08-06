import { useSelector, shallowEqual } from 'react-redux';
import { getNowTime,  } from 'util/time';

export default function ReplyInfo({ id }) {
  const { contNum } = useSelector(state => ({
    contNum: state.forum.get(id).contNum
  }), shallowEqual);

  return (
    <div className="info">
      <div>@{contNum}, {getNowTime()} </div>
    </div>
  )
}