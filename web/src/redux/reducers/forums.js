import {
  SET_FORUMS,
  DELETE_FORUMS
} from "../actions/forums";


const initState = {};

export default function forumReducer(preState = initState, action) {
  const { type, data } = action;
  console.log("REDUX=====\n", action)
  switch (type) {
    case SET_FORUMS:
      let newState = Object.assign({}, preState);
      for(let forum of data){
        mergeForum(newState, forum)
      }
      return newState;

    case DELETE_FORUMS:
      return initState;

    default:
      return preState;
  }
}

const mergeArticles = (existingArticles, articles) => {
  if (articles) {
    for (let article of articles) {
      let no = article.no;
      existingArticles[no] = Object.assign({}, existingArticles[no], article);
    }
  }
  return existingArticles;
}

const mergeForum = (forums, forum) => {
  let { articleId } = forum;
  let existing = forums[articleId] || { articleId, articles: [] };
  forum.articles = mergeArticles(existing.articles, forum.articles);
  Object.assign(existing, forum);
  Object.assign(forums, { [articleId]: existing });
  return forums;
}