export const SET_DISCUSSIONS = "SET_DISCUSSIONS";
export const DELETE_DISCUSSIONS = "DELETE_DISCUSSIONS";

export const setDiscussions = (discussions) => ({
  type: SET_DISCUSSIONS,
  data: discussions
});

export const setDiscussion = (discussion) => ({
  type: SET_DISCUSSIONS,
  data: [discussion]
});

export const setForumArticle = (article) => ({
  type: SET_DISCUSSIONS,
  data: [{
    articleId: article.articleId,
    articles: [article]
  }]
});

export const deleteForums = () => ({
  type: DELETE_DISCUSSIONS,
});