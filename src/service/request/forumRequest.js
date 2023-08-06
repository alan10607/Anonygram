import request from ".";

const getId = () => request.getMethod(
  `/forum/id`
);

const getArticles = (idList) => request.getMethod(
  `/forum/articles/${idList.join(",")}`
);

const getArticle = (id) => request.getMethod(
  `/forum/article/${id}`
);

const setArticle = (title, word) => request.postMethod(
  `/forum/article/`,
  { title, word }
);

const deleteArticle = (id) => request.deleteMethod(
  `/forum/article/${id}`
);

const getContents = (id, noList) => request.getMethod(
  `/forum/contents/${id}/${noList.join(",")}`
);

const getContent = (id, no) => request.getMethod(
  `/forum/contents/${id}/${no}`
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
  getArticles,
  getArticle,
  setArticle,
  deleteArticle,
  getContents,
  getContent,
  setContent,
  deleteContent,
  likeContent,
  uploadImg
};