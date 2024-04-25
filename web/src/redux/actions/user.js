export const SET_USER = "SET_USER";
export const DELETE_USER = "DELETE_USER";

export const setUser = (user) => ({
  type: SET_USER,
  data: user
});

export const deleteUser = () => ({
  type: DELETE_USER
});