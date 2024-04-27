import { shallowEqual, useSelector } from 'react-redux';
import { getNowTime } from 'util/timeUtil';
import './Info.scss';

export default function ReplyInfo({ id }) {
  const { count } = useSelector(state => ({
    count: state.forums[id].count
  }), shallowEqual);

  return (
    <div className="info">
      <div>@{count}, {getNowTime()} </div>
    </div>
  )
}