import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/actions/common';
import queryRequest from 'service/request/queryRequest';
import usePrevious from 'util/usePrevious';
import useThrottle from 'util/useThrottle';
import QueryArticle from '../Forum/Discussion/Article/QueryArticle';
import './Query.scss';

export default function Query() {
  const [keyword, setKeyword] = useState("");
  const [matchedArticles, setMatchedArticles] = useState([]);
  const [hint, setHint] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const previousKeyword = usePrevious(keyword);

  const queryArticle = useThrottle(() => {
    if (keyword.trim() && keyword !== previousKeyword) {
      dispatch(setLoading(true));
      queryRequest.queryArticle(keyword.trim())
        .then(articles => {
          setMatchedArticles(articles)
          setHint(t("text.query.matched.length", { length: articles.length }));
        })
        .catch(e => {
          setMatchedArticles([]);
          setHint("");
          console.error("Query article failed", e)
        })
        .finally(() => dispatch(setLoading(false)));
    }
  })

  const getMatchedArticlesNodes = () => {
    const nodes = [];
    for (const article of matchedArticles) {
      const { articleId: id, no } = article;
      const key = `${id}_${no}`;
      nodes.push(<QueryArticle key={key} article={article} />);
    }
    return nodes;
  }


  return (
    <div id="query">
      <input value={keyword}
        onChange={(event) => { setKeyword(event.target.value) }}
        onBlur={queryArticle}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            queryArticle();
          }
        }}
        className="query-keyword"
        type="text"
        placeholder={t("text.query.keyword")} />
      <div className="query-hint">{hint}</div>
      <div className="matched-articles">{getMatchedArticlesNodes()}</div>
    </div>
  )
}