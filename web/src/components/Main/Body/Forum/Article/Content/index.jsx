import Bar from './Bar';
import Info from './Info';
import Title from './Title';
import Word from './Word';
import './Content.scss';

export default function Content({ id, no }) {
  return (
    <div id={`${id}_${no}`} className="cont">
      {no === 0 && <Title id={id} no={no} />}
      <Bar id={id} no={no} />
      <Word id={id} no={no} />
      <Info id={id} no={no} />
    </div>
  )
}