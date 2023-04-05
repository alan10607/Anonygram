//Backend url
export const PROTOCOL = "https:";
export const DOMAIN  = "localhost";
// const PROTOCOL = window.location.protocol;
// const DOMAIN = window.location.host;

//Jwt
export const JWT_TOKEN = "ag-jwt";

//Pic
const PUBLIC_URL = process.env.PUBLIC_URL;
export const ICON_USER = `${PUBLIC_URL}/pic/user.png`;
export const ICON_LIKE = `${PUBLIC_URL}/pic/like.svg`;
export const ICON_UPLOAD_IMG = `${PUBLIC_URL}/pic/uploadImg.png`;
export const ICON_ADD = `${PUBLIC_URL}/pic/add.png`;
export const ICON_OPTION = `${PUBLIC_URL}/pic/option.png`;
export const ICON_CLOSE = `${PUBLIC_URL}/pic/close.png`;
export const ICON_LOGO = `${PUBLIC_URL}/pic/logo.svg`;

//Data static
export const CONT_STATUS_TYPE = { NORMAL : "NORMAL", DELETED : "DELETED" };
export const BIG_BOX_ID = { NEW : "NEW", SETTING : "SETTING" };