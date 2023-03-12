import { SHOW_CONSOLE, CLOSE_CONSOLE } from "../type";

export const showConsole = (data) => ({ type: SHOW_CONSOLE, data });
export const closeConsole = (data) => ({ type: CLOSE_CONSOLE });
