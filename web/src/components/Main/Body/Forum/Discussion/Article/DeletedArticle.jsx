import DeletedInfo from './Info/DeletedInfo';
import './Article.scss';

export default function DeletedArticle({ article, article: { articleId: id, no } }) {

  return (
    <div id={`${id}_${no}`} className="art">
      <DeletedInfo article={article} />
    </div>
  )
}