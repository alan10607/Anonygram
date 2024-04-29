import './Article.scss';
import Bar from './Bar';
import Info from './Info';
import Title from './Title';
import Word from './Word';

export default function Article({ article, article: { articleId: id, no } }) {

  return (
    <div id={`${id}_${no}`} className="art">
      {no === 0 && <Title article={article} />}
      <Bar article={article} />
      <Word article={article} />
      <Info article={article} />
    </div>
  )
}