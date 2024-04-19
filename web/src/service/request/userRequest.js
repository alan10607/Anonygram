import request from ".";

export default {
  get: (userId) =>
    request.getMethod(`/user/${userId}`),

  create: (username, email, password) =>
    request.postMethod(`/user`, { username, email, password }),

  updateLanguage: (language) =>
    request.patchMethod(`/user`, { language }),

  updateTheme: (theme) =>
    request.patchMethod(`/user`, { theme }),

  updateHeadUrl: (headUrl) =>
    request.patchMethod(`/user`, { headUrl }),
};