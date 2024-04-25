import { shallowEqual, useSelector } from 'react-redux';
import { getNowTime } from 'util/timeUtil';
import './Info.scss';

export default function ReplyInfo({ id }) {
  const { contentSize } = useSelector(state => ({
    contentSize: state.forums[id].count
  }), shallowEqual);

  return (
    <div className="info">
      <div>@{contentSize}, {getNowTime()} </div>
    </div>
  )
}