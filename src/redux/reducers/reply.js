import {
  REPLY_SET_ID,
  REPLY_SET_TITLE,
  REPLY_SET_HTML,
  REPLY_ADD_IMG,
  REPLY_SET_OPEN,
  RESET_REPLY_DATA
} from "../actions/reply";

const initState = {
  id: "",
  title: "",
  html: "",
  isOpen: true
};

export default function replyReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case REPLY_SET_ID:
      return Object.assign({}, preState, { id: data });

    case REPLY_SET_TITLE:
      return Object.assign({}, preState, { title: data });

    case REPLY_SET_HTML:
      return Object.assign({}, preState, { html: data });

    case REPLY_ADD_IMG:
      const html = preState.html;
      return Object.assign({}, preState, {
        html: `${html}<img src="${data}" alt="${data}"/><div><br></div>`
      });

    case REPLY_SET_OPEN:
      return Object.assign({}, preState, { isOpen: data });

    case RESET_REPLY_DATA:
      return initState;

    default:
      return preState;
  }
}