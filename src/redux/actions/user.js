export const SET_USER = "setUser";
export const DELETE_USER = "deleteUser";

export const setUser = (user) => ({
  type: SET_USER,
  data: user
});

export const deleteUser = () => ({
  type: DELETE_USER
});