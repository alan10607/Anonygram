import { getTimeFromStr } from 'util/timeUtil';
import './Info.scss';

export default function QueryInfo({ article: { no, createdTime } }) {
  return (
    <div className="info">
      <div>@{no}, {getTimeFromStr(createdTime)}</div>
    </div>
  )
}