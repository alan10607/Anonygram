import request from ".";

export default {
  get: () =>
    request.getMethod(`/token`),

  create: (email, password) =>
    request.postMethod(`/token`, { email, password }),
};