import request from ".";

export default {
  get: (articleId, no) =>
    request.getMethod(`/forum/${articleId}/${no}`),

  getByPage: (articleId, page) =>
    request.getMethod(`/forum/${articleId}?page=${page}`),

  getMulti: (articleIdList) =>
    request.getMethod(`/forums/${articleIdList.join(",")}`)
};