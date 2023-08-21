import { STATUS_TYPE } from "config/constant";
import {
  SET_ALL_ID,
  DELETE_ALL_ID,
  SET_ALL_ARTICLE,
  SET_ARTICLE,
  DELETE_ARTICLE,
  DELETE_CONTENT,
  UPDATE_CONTENT_LIKE
} from "../actions/forum";

const initForumMap = new Map();

export default function forumReducer(preState = initForumMap, action) {
  const { type, data } = action;
  const newState = new Map(preState);

  console.warn("Reducer get data, type=", type, "data=", data);
  switch (type) {
    case SET_ALL_ID:
      data.forEach(id => newState.set(id, null));
      return newState;

    case DELETE_ALL_ID:
      return initForumMap;

    case SET_ALL_ARTICLE:
      data.forEach(article => addArticleToState(article, newState));
      return newState;

    case SET_ARTICLE:
      addArticleToState(data, newState);
      return newState;

    case DELETE_ARTICLE:
      newState.get(data.id).status = STATUS_TYPE.DELETED;
      return newState;

    case DELETE_CONTENT:
      newState.get(data.id).contentList[data.no].status = STATUS_TYPE.DELETED;
      return newState;

    case UPDATE_CONTENT_LIKE:
      newState.get(data.id).contentList[data.no].like = data.like;
      newState.get(data.id).contentList[data.no].likes += data.like ? 1 : -1;
      return newState;

    default:
      return preState;
  }
}

const addArticleToState = (newArticle, stateMap) => {
  const article = stateMap.get(newArticle.id) ? stateMap.get(newArticle.id) : {};
  for (const key of Object.keys(newArticle)) {
    if (key === "contentList") {
      for (const newContent of newArticle.contentList) {
        if (!article.contentList) article.contentList = [];
        article.contentList[newContent.no] = newContent;
      }
    } else {
      article[key] = newArticle[key];
    }
  }

  stateMap.set(article.id, article);
}