export const SAVE_USER_DATA = "saveUserData";
export const RESET_USER_DATA = "resetUserData";

export const saveUserData = (jwtPayload) => ({ type: SAVE_USER_DATA, data : jwtPayload });
export const resetUserData = () => ({ type: RESET_USER_DATA });