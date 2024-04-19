import request from ".";

export default {
  getArticleIds: () =>
    request.getMethod(`/query/articleIds`),

  queryArticle: (query) =>
    request.getMethod(`/query/article?query=${query}`)
};