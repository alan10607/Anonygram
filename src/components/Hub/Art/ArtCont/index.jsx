import { useSelector, shallowEqual } from 'react-redux';
import Bar from '../Bar';
import Word from '../Word';
import Info from '../Info';
import './index.scss';

export default function ArtCont({ id, no = 0 }) {
  const { title } = useSelector(state => ({
    title: state.post.get(id).title
  }), shallowEqual);

  return (
    <div id={`${id}_${no}`} className="art-cont">
      <Bar id={id} no={no} />
      <div className="title">{title}</div>
      <Word id={id} no={no} />
      <Info id={id} no={no} />
    </div>
  )
}