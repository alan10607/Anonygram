import { getNowTime } from 'util/timeUtil';

export default function NewInfo() {
  return (
    <div className="info">
      <div>{getNowTime()} </div>
    </div>
  )
}