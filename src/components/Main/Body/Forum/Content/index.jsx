import Bar from './Bar';
import Word from './Word';
import Info from './Info';
import './index.scss';

export default function Content({ id, no }) {
  return (
    <div id={`${id}_${no}`} className="cont">
      <Bar id={id} no={no} />
      <Word id={id} no={no} />
      <Info id={id} no={no} />
    </div>
  )
}