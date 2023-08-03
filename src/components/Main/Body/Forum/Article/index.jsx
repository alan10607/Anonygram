import { useSelector, shallowEqual } from 'react-redux';
import Content from '../Content';
import './index.scss';

export default function Article({ id, no = 0 }) {
  const { title } = useSelector(state => ({
    title: state.forum.get(id).title
  }), shallowEqual);

  return (
    <div id={`${id}_${no}`} className="art-cont">
      <div className="title">{title}</div>
      <Content id={id} no={no} />
    </div>
  )
}