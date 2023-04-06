import { jwtRequest } from ".";

const req = (path, data) => jwtRequest(`post/${path}`, data);
const findIdSet = (data) => req("findIdSet", data);
const findPost = (data) => req("findPost", data);
const createPost = (data) => req("createPost", data);
const deletePost = (data) => req("deletePost", data);
const findTopCont = (data) => req("findTopCont", data);
const deleteCont = (data) => req("deleteCont", data);
const likeContent = (data) => req("likeContent", data);
const unlikeContent = (data) => req("unlikeContent", data);
const uploadImg = (data) => req("uploadImg", data);

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