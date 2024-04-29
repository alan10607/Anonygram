import './Title.scss';

export default function Title({ article: { title } }) {
  return (
    <div className="title">{title}</div>
  )
}