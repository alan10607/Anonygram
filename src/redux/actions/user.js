export const SET_USER = "setUser";
export const DELETE_USER = "deleteUser";
export const DELETE_USER_EXCEPT_TOKENS = "deleteUserExceptTokens";

export const setUser = (user) => ({
  type: SET_USER,
  data: user
});

export const deleteUser = () => ({
  type: DELETE_USER
});

export const deleteUserExceptTokens = () => ({
  type: DELETE_USER_EXCEPT_TOKENS

})