import request from ".";

const getId = () => request.getMethod(
  `/forum/id`
);

const getArticle = (idList, noList) => request.getMethod(
  `/forum/article/${idList.join(",")}/${noList.join(",")}`
);

const createArticle = (title, word) => request.postMethod(
  `/forum/article/`,
  { title, word }
);

const createContent = (id, word) => request.postMethod(
  `/forum/article/${id}`,
  { word }
);

const createImage = (imageBase64) => request.postMethod(
  `/forum/image`,
  { imageBase64 }
)

const deleteContent = (id, no) => request.deleteMethod(
  `/forum/article/${id}/${no}`
);

const updateContentLike = (id, no, like) => request.patchMethod(
  `/forum/article/${id}/${no}/like`,
  { like }
)

export default {
  getId,
  getArticle,
  createArticle,
  createContent,
  createImage,
  deleteContent,
  updateContentLike,
};