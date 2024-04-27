export const SET_REPLY_ID = "SET_REPLY_ID";
export const SET_REPLY_HTML = "SET_REPLY_HTML";
export const ADD_REPLY_HTML = "ADD_REPLY_HTML";
export const SET_CONSOLE = "SET_CONSOLE";
export const SET_LOADING = "SET_LOADING";
export const SET_ARTICLE_IDS = "SET_ARTICLE_IDS";

export const setReplyId = (id) => ({
  type: SET_REPLY_ID,
  data: id
});

export const setReplyHtml = (id, html) => ({
  type: SET_REPLY_HTML,
  data: { id, html }
});

export const addReplyHtml = (id, html) => ({
  type: ADD_REPLY_HTML,
  data: { id, html }
});

export const setConsole = (message) => ({
  type: SET_CONSOLE,
  data: message
});

export const setLoading = (show) => ({
  type: SET_LOADING,
  data: show
});

export const setArticleIds = (ids) => ({
  type: SET_ARTICLE_IDS,
  data: ids
});
