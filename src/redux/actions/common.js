export const SHOW_LOADING = "showLoading";
export const CLOSE_LOADING = "closeLoading";
export const SET_CONSOLE = "setConsole";
export const DELETE_CONSOLE = "deleteConsole";
export const SET_REPLY_ID = "setReplyId";
export const SET_REPLY_HTML = "setReplyHtml";
export const ADD_REPLY_HTML = "addReplyHtml";

export const setReplyId = (id) => ({ 
  type: SET_REPLY_ID, 
  data: id 
});

export const setReplyHtml = (id, html) => ({ 
  type: SET_REPLY_HTML, 
  data: {id, html} 
});

export const addReplyHtml = (id, html) => ({ 
  type: ADD_REPLY_HTML, 
  data: {id, html} 
});

export const showBigBox = (openBigBoxId) => ({ type: SHOW_BIG_BOX, data: openBigBoxId });
export const closeBigBox = () => ({ type: CLOSE_BIG_BOX });
export const showConsole = (data) => ({ type: SHOW_CONSOLE, data });
export const closeConsole = () => ({ type: CLOSE_CONSOLE });
export const showLoading = () => ({ type: SHOW_LOADING });
export const closeLoading = () => ({ type: CLOSE_LOADING });