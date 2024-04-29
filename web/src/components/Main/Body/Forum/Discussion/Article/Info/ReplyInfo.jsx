import { getNowTime } from 'util/timeUtil';
import './Info.scss';

export default function ReplyInfo({ discussion: { count } }) {
  return (
    <div className="info">
      <div>@{count}, {getNowTime()} </div>
    </div>
  )
}