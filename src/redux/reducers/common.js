import {
  SET_REPLY_ID,
  SET_REPLY_HTML,
  ADD_REPLY_HTML,
  SHOW_BIG_BOX,
  CLOSE_BIG_BOX,
  SHOW_CONSOLE,
  CLOSE_CONSOLE,
  SHOW_LOADING,
  CLOSE_LOADING
} from "../actions/common";

const initState = {
  replyId: "",
  replyHtml: {},
  consoleStr: "",
  isLoading: false,
  openBigBoxId: ""
};

export default function commonReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case SET_REPLY_ID:
      if (!preState.replyHtml[data]) {//set init for reply html
        preState.replyHtml[data] = "<div><br></div>";
      }
      return Object.assign({}, preState, { replyId: data });

    case SET_REPLY_HTML:
      preState.replyHtml[data.id] = data.html;
      return Object.assign({}, preState);

    case ADD_REPLY_HTML:
      const endBrExp = /<div><br><\/div>$/gi;
      let oldHtml = preState.replyHtml[data.id];
      oldHtml = oldHtml.replace(endBrExp, "");
      preState.replyHtml[data.id] = oldHtml + data.html + "<div><br></div>";
      return Object.assign({}, preState);

    case SHOW_BIG_BOX:
      return Object.assign({}, preState, { openBigBoxId: data });

    case CLOSE_BIG_BOX:
      return Object.assign({}, preState, { openBigBoxId: "" });

    case SHOW_CONSOLE:
      return Object.assign({}, preState, { consoleStr: data });

    case CLOSE_CONSOLE:
      return Object.assign({}, preState, { consoleStr: "" });

    case SHOW_LOADING:
      return Object.assign({}, preState, { isLoading: true });

    case CLOSE_LOADING:
      return Object.assign({}, preState, { isLoading: false });

    default:
      return preState;
  }
}