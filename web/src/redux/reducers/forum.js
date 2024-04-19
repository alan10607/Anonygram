import {
  SET_FORUMS,
  SET_IDS,
  DELETE_FORUMS_AND_IDS
} from "../actions/forum";

const initState = {};
const ARTICLEIDS = "articleIds";

export default function forumReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case SET_FORUMS:
      return Object.assign({}, mergeForum(preState, data));

    case SET_IDS:
      return Object.assign({}, preState, { ARTICLEIDS: ids });

    case DELETE_FORUMS_AND_IDS:
      return initState;

    default:
      return preState;
  }
}

const mergeArticleList = (existingArticleList, articleList) => {
  if (articleList) {
    for (let article of articleList) {
      let no = article.no;
      existingArticleList[no] = Object.assign({}, existingArticleList[no], article);
    }
  }
  return existingArticleList;
}

const mergeForum = (forums, forum) => {
  let { articleId } = forum;
  let existing = forums[articleId] || { articleId, articleList: [] };
  forum.articleList = mergeArticleList(existing.articleList, forum.articleList);
  Object.assign(forums, { [articleId]: forum });
  return forums;
}