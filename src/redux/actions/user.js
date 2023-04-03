export const SAVE_USER_DATA = "saveUserData";
export const DELETE_USER_DATA = "deleteUserData";

export const saveUserData = (jwtPayload) => ({ type: SAVE_USER_DATA, data : jwtPayload });
export const deleteUserData = () => ({ type: DELETE_USER_DATA });