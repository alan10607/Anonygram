import { postWithJwt } from "./api";

const http = (path, data) => postWithJwt(`post/${path}`, data);
const findIdSet = (data) => http("findIdSet", data);
const findPost = (data) => http("findPost", data);
const createPost = (data) => http("createPost", data);
const deletePost = (data) => http("deletePost", data);
const findTopCont = (data) => http("findTopCont", data);
const deleteCont = (data) => http("deleteCont", data);
const likeContent = (data) => http("likeContent", data);
const unlikeContent = (data) => http("unlikeContent", data);
const uploadImg = (data) => http("uploadImg", data);

export default {
  findIdSet,
  findPost,
  createPost,
  deletePost,
  findTopCont,
  deleteCont,
  likeContent,
  unlikeContent,
  uploadImg
};

