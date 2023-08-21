export const SET_ALL_ID = "setAllId";
export const DELETE_ALL_ID = "deleteAllId";
export const SET_ALL_ARTICLE = "setAllArticle";
export const SET_ARTICLE = "setArticle";
export const DELETE_ARTICLE = "deleteArticle";
export const DELETE_CONTENT = "deleteContent";
export const UPDATE_CONTENT_LIKE = "updateContentLike";

export const setAllId = (ids) => ({ 
  type: SET_ALL_ID, 
  data: ids 
});

export const deleteAllId = () => ({ 
  type: DELETE_ALL_ID 
});

export const setAllArticle = (article) => ({ 
  type: SET_ALL_ARTICLE, 
  data: article 
});

export const setArticle = (article) => ({ 
  type: SET_ARTICLE, 
  data: article 
});

export const deleteArticle = (id) => ({ 
  type: DELETE_ARTICLE, 
  data: { id } 
});

export const deleteContent = (id, no) => ({ 
  type: DELETE_CONTENT, 
  data: { id, no } 
});

export const updateContentLike = (id, no, like) => ({ 
  type: UPDATE_CONTENT_LIKE, 
  data: { id, no, like } 
});