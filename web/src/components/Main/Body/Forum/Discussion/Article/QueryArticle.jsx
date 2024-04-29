import './Article.scss';
import QueryBar from './Bar/QueryBar';
import QueryInfo from './Info/QueryInfo';
import Title from './Title';
import Word from './Word';

export default function QueryArticle({ article, article: { articleId: id, no } }) {

  return (
    <div id={`${id}_${no}`} className="art">
      {no === 0 && <Title article={article} />}
      <QueryBar article={article} />
      <Word article={article} />
      <QueryInfo article={article} />
    </div>
  )
}