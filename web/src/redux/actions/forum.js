export const SET_FORUMS = "SET_FORUMS";
export const SET_IDS = "SET_IDS";
export const DELETE_FORUMS_AND_IDS = "DELETE_FORUMS_AND_IDS";

export const setForums = (forums) => ({
  type: SET_FORUMS,
  data: forums
});

export const setForum = (forum) => ({
  type: SET_FORUMS,
  data: [forum]
});

export const setArticle = (article) => ({
  type: SET_FORUMS,
  data: [{
    articleId: articleList[0].articleId,
    articleList: [article]
  }]
});

export const setIds = (ids) => ({
  type: SET_IDS,
  data: ids
});


export const deleteAll = () => ({
  type: DELETE_FORUMS_AND_IDS,
});



// export const SET_IDS = "setIds";
// export const DELETE_IDS = "deleteIds";
// export const SET_ARTICLES = "setArticles";
// export const SET_ARTICLE = "setArticle";
// export const DELETE_ARTICLE = "deleteArticle";
// export const DELETE_CONTENT = "deleteContent";
// export const UPDATE_CONTENT_LIKE = "updateContentLike";

// export const setIds = (ids) => ({
//   type: SET_IDS,
//   data: ids
// });

// export const deleteIds = () => ({
//   type: DELETE_IDS
// });

// export const setArticles = (article) => ({
//   type: SET_ARTICLES,
//   data: article
// });

// export const setArticle = (article) => ({
//   type: SET_ARTICLE,
//   data: article
// });

// export const deleteArticle = (id) => ({
//   type: DELETE_ARTICLE,
//   data: { id }
// });

// export const deleteContent = (id, no) => ({
//   type: DELETE_CONTENT,
//   data: { id, no }
// });

// export const updateContentLike = (id, no, like) => ({
//   type: UPDATE_CONTENT_LIKE,
//   data: { id, no, like }
// });