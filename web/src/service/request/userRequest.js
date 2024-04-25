import request from ".";

export default {
  get: (userId) =>
    request.getMethod(`/user/${userId}`),

  create: (username, email, password) =>
    request.postMethod(`/user`, { username, email, password }),

  updateLanguage: (userId, language) =>
    request.patchMethod(`/user/${userId}`, { language }),

  updateTheme: (userId, theme) =>
    request.patchMethod(`/user/${userId}`, { theme }),

  updateHeadUrl: (userId, headUrl) =>
    request.patchMethod(`/user/${userId}`, { headUrl }),
};