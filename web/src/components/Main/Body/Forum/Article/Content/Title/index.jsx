import { shallowEqual, useSelector } from 'react-redux';
import './Title.scss';

export default function Title({ id, no }) {
  const { title } = useSelector(state => ({
    title: state.forums[id].articles[no].title
  }), shallowEqual);

  return (
    <div className="title">{title}</div>
  )
}