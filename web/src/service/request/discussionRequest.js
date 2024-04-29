import request from ".";

export default {
  get: (articleId, no) =>
    request.getMethod(`/discussion/${articleId}/${no}`),

  getByPage: (articleId, page) =>
    request.getMethod(`/discussion/${articleId}?page=${page}`),

  getMulti: (articleIdList) =>
    request.getMethod(`/discussions/${articleIdList.join(",")}`)
};