import {
  SET_REPLY_ID,
  SET_REPLY_HTML,
  ADD_REPLY_HTML,
  SET_CONSOLE,
  SET_LOADING
} from "../actions/common";

const initState = {
  replyId: "",
  replyHtml: {},
  console: "",
  loading: false
};

export default function commonReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case SET_REPLY_ID:
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

    case SET_CONSOLE:
      return Object.assign({}, preState, { console: data });

    case SET_LOADING:
      return Object.assign({}, preState, { loading: data });

    default:
      return preState;
  }
}