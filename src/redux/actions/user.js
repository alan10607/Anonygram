export const SET_USER = "setUser";
export const DELETE_USER = "deleteUser";

export const setUser = (userId, username, isAnonymous, tokenMaxAge) => ({
  type: SET_USER,
  data: { userId, username, isAnonymous, tokenMaxAge }
});

export const deleteUser = () => ({
  type: DELETE_USER
});