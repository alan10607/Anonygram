import { getNowTime,  } from 'util/time';

export default function NewInfo({ id }) {
  return (
    <div className="info">
      <div>{getNowTime()} </div>
    </div>
  )
}