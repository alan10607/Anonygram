import { getNowTime } from 'util/timeUtil';
import './Info.scss';

export default function NewInfo() {
  return (
    <div className="info">
      <div>{getNowTime()} </div>
    </div>
  )
}