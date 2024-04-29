import {
  SET_DISCUSSIONS,
  DELETE_DISCUSSIONS
} from "../actions/discussions";


const initState = {};

export default function discussionsReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case SET_DISCUSSIONS:
      let newState = Object.assign({}, preState);
      for(let dicussion of data){
        mergeDiscussion(newState, dicussion)
      }
      return newState;

    case DELETE_DISCUSSIONS:
      return initState;

    default:
      return preState;
  }
}

const mergeArticles = (existingArticles, articles) => {
  if (articles) {
    for (const article of articles) {
      let no = article.no;
      existingArticles[no] = Object.assign({}, existingArticles[no], article);
    }
  }
  return existingArticles;
}

const mergeDiscussion = (discussions, discussion) => {
  let { articleId } = discussion;
  let existing = discussions[articleId] || { articleId, articles: [] };
  discussion.articles = mergeArticles(existing.articles, discussion.articles);
  Object.assign(existing, discussion);
  Object.assign(discussions, { [articleId]: existing });
  return discussions;
}