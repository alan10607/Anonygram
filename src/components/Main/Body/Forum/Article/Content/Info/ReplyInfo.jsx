import { shallowEqual, useSelector } from 'react-redux';
import { getNowTime } from 'util/time';

export default function ReplyInfo({ id }) {
  const { contentSize } = useSelector(state => ({
    contentSize: state.forum.get(id).contentSize
  }), shallowEqual);

  return (
    <div className="info">
      <div>@{contentSize}, {getNowTime()} </div>
    </div>
  )
}