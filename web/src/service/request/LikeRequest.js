import request from ".";

export default {
  create: (id, no) =>
    request.postMethod(`/like/${id}/${no}`),

  delete: (id, no) =>
    request.deleteMethod(`/like/${id}/${no}`)
};