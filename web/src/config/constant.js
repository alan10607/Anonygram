/* --- Banner --- */
console.log(String.raw`
    ___  _   __ ___  _   __  __ ____ ____  ___  __  ___
   /   |/ | / / __ \/ | /\ \/ / ___// __ \/   |/  |/  /
  / /| /  |/ / / / /  |/ /\  / / __/ /_/ / /| / /|_/ /
 / __ / /|  / /_/ / /|  / / / /_/ / _  _/ __ / /  / /
/_/  /_/ |_/\____/_/ |_/ /_/\____/_/ |_/_/  /_/  /_/
 
`);

/* --- Backend url --- */
export const VERSION = "v20230908";
export const WELCOME_PAGE = "/forum/index";

/* --- Backend url --- */
export const BACKEND_API_URL = `${window.location.protocol}//${window.location.host}/api`;
console.log("BACKEND_API_URL:", BACKEND_API_URL);

/* --- LocalStorage --- */
export const JWT_TOKEN = "ag-jwt";

/* --- Pic --- */
const PUBLIC_URL = process.env.PUBLIC_URL;
export const ICON_LOGO = `${PUBLIC_URL}/pic/logo.svg`;
export const ICON_USER = `${PUBLIC_URL}/pic/user.svg`;
export const ICON_LIKE = `${PUBLIC_URL}/pic/like.svg`;
export const ICON_UPLOAD_IMG = `${PUBLIC_URL}/pic/uploadImg.svg`;
export const ICON_FORUM = `${PUBLIC_URL}/pic/forum.svg`;
export const ICON_ADD = `${PUBLIC_URL}/pic/add.svg`;
export const ICON_QUERY = `${PUBLIC_URL}/pic/query.svg`;
export const ICON_SETTING = `${PUBLIC_URL}/pic/setting.svg`;
export const ICON_CLOSE = `${PUBLIC_URL}/pic/close.svg`;

/* --- Data static --- */
export const STATUS_TYPE = { NORMAL: "NORMAL", DELETED: "DELETED", UNKNOWN: "UNKNOWN" };
export const REPLY_BOX = "data-reply-box";
export const REPLY_BOX_ATTR = { [REPLY_BOX]: true };