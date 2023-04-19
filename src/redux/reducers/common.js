import {
  SHOW_BIG_BOX,
  CLOSE_BIG_BOX,
  SHOW_CONSOLE,
  CLOSE_CONSOLE,
  SHOW_LOADING,
  CLOSE_LOADING
} from "../actions/common";

const initState = {
  consoleStr: "",
  isLoading: false,
  openBigBoxId: ""
};

export default function commonReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
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