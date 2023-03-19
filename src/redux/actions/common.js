export const SHOW_BIG_BOX = "showBigBox";
export const CLOSE_BIG_BOX = "closeBigBox";
export const SHOW_CONSOLE = "showLoading";
export const CLOSE_CONSOLE = "closeLoading";
export const SHOW_LOADING = "showLoading";
export const CLOSE_LOADING = "closeLoading";
export const NEED_RELOAD = "needReload";

export const showBigBox = () => ({ type: SHOW_BIG_BOX });
export const closeBigBox = () => ({ type: CLOSE_BIG_BOX });
export const showConsole = (data) => ({ type: SHOW_CONSOLE, data });
export const closeConsole = () => ({ type: CLOSE_CONSOLE });
export const showLoading = () => ({ type: SHOW_LOADING });
export const closeLoading = () => ({ type: CLOSE_LOADING });
export const needReload = () => ({ type: NEED_RELOAD });