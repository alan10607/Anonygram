import { STATUS_TYPE } from 'config/constant';
import { Fragment } from 'react';
import Article from './Article';
import DeletedArticle from './Article/DeletedArticle';
import './Discussion.scss';
import Move from './Move';
import Reply from './Reply';

export default function Discussion({ discussion, discussion: { articleId: id, articles } }) {
  const getArticleNodes = () => {
    const nodes = [];
    for (let no = 0; no < articles.length; ++no) {
      const key = `${id}_${no}`;
      const article = articles[no];
      if (!article) continue;//not load yet

      if (article.status === STATUS_TYPE.NORMAL) {
        nodes.push(<Article key={key} article={article} />);
      } else if (article.status === STATUS_TYPE.DELETED) {
        nodes.push(<DeletedArticle key={key} article={article} />);
      }
    }
    return nodes;
  }

  return (
    <div id={id} className="discussion">
      <Fragment>{getArticleNodes()}</Fragment>
      <Move discussion={discussion} />
      <Reply discussion={discussion} />
    </div>
  )
}