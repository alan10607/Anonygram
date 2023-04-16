export const REPLY_SET_ID = "replySetId";
export const REPLY_SET_TITLE = "replySetTitle";
export const REPLY_SET_HTML = "replySetHtml";
export const REPLY_ADD_IMG = "replyAddImg";
export const REPLY_SET_OPEN = "replySetOpen";
export const RESET_REPLY_DATA = "resetReplyData";

export const replySetId = (data) => ({ type: REPLY_SET_ID, data });
export const replySetTitle = (data) => ({ type: REPLY_SET_TITLE, data });
export const replySetHtml = (data) => ({ type: REPLY_SET_HTML, data });
export const replyAddImg = (data) => ({ type: REPLY_ADD_IMG, data });
export const replySetOpen = (data) => ({ type: REPLY_SET_OPEN, data });
export const resetReplyData = () => ({ type: RESET_REPLY_DATA });