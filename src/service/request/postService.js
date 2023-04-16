import request from ".";

const findIdSet = () => request.postMethod("post/findIdSet", {});
const findPost = ({ idList }) => request.postMethod("post/findPost", { idList });
const createPost = ({ title, word }) => request.postMethod("post/createPost", { title, word });
const deletePost = ({ id, no }) => request.postMethod("post/deletePost", { id, no });
const findTopCont = ({ id, no }) => request.postMethod("post/findTopCont", { id, no });
const replyPost = ({ id, word }) => request.postMethod("post/replyPost", { id, word });
const deleteCont = ({ id, no }) => request.postMethod("post/deleteContent", { id, no });
const likeContent = ({ id, no }) => request.postMethod("post/likeContent", { id, no });
const unlikeContent = ({ id, no }) => request.postMethod("post/unlikeContent", { id, no });
const uploadImg = ({ id, imgBase64 }) => request.postMethod("post/uploadImg", { id, imgBase64 });

export default {
  findIdSet,
  findPost,
  createPost,
  deletePost,
  findTopCont,
  replyPost,
  deleteCont,
  likeContent,
  unlikeContent,
  uploadImg
};