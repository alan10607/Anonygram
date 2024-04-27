export const SET_FORUMS = "SET_FORUMS";
export const DELETE_FORUMS = "DELETE_FORUMS";

export const setForums = (forums) => ({
  type: SET_FORUMS,
  data: forums
});

export const setForum = (forum) => ({
  type: SET_FORUMS,
  data: [forum]
});

export const setForumArticle = (article) => ({
  type: SET_FORUMS,
  data: [{
    articleId: article.articleId,
    articles: [article]
  }]
});

export const deleteForums = () => ({
  type: DELETE_FORUMS,
});