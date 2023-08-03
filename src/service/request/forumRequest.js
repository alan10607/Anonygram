import request from ".";

const getId = () => request.getMethod(
  `/forum/id`
);

const getArticle = (id) => request.getMethod(
  `/forum/article/${id}`
);

const setArticle = (id, title, word) => request.postMethod(
  `/forum/article/`,
  { title, word }
);

const deleteArticle = (id) => request.deleteMethod(
  `/forum/article/${id}`
);

const getContent = (id, no) => request.getMethod(
  `/forum/content/${id}/${no}`
);

const setContent = (id, word) => request.postMethod(
  `/forum/content/${id}`,
  { word }
);

const deleteContent = (id, no) => request.deleteMethod(
  `/forum/content/${id}/${no}`
);

const likeContent = (id, no, like) => request.patchMethod(
  `/forum/like/${id}/${no}`,
  { like }
)

const uploadImg = (id, imgBase64) => request.postMethod(
  `/forum/img`,
  { id, imgBase64 }
)


export default {
  getId,
  getArticle,
  setArticle,
  deleteArticle,
  getContent,
  setContent,
  deleteContent,
  likeContent,
  uploadImg
};