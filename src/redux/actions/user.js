export const SET_USER = "setUser";
export const DELETE_USER = "deleteUser";



export const setUser = (userId, username, isAnonymous) => ({
  type: SET_USER,
  data: { userId, username, isAnonymous }
});

export const setLanguage = (language) => ({
  type: SET_USER,
  data: { language }
});

export const setTheme = (theme) => ({
  type: SET_USER,
  data: { theme }
});

export const deleteUser = () => ({
  type: DELETE_USER
});