import { getNowTime } from 'util/time';

export default function NewInfo() {
  return (
    <div className="info">
      <div>{getNowTime()} </div>
    </div>
  )
}