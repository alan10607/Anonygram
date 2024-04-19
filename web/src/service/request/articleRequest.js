import request from ".";

export default {
  create: (title, word) =>
    request.postMethod(`/article`, { title, word }),

  createReply: (id, word) =>
    request.postMethod(`/article/${id}`, { word }),

  delete: (id, no) =>
    request.deleteMethod(`/article/${id}/${no}`)
};