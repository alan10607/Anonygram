import { jwtPostRequest } from ".";

const pReq = (path, data) => jwtPostRequest(`post/${path}`, data);
const findIdSet = (data) => pReq("findIdSet", data);
const findPost = (data) => pReq("findPost", data);
const createPost = (data) => pReq("createPost", data);
const deletePost = (data) => pReq("deletePost", data);
const findTopCont = (data) => pReq("findTopCont", data);
const replyPost = (data) => pReq("replyPost", data);
const deleteCont = (data) => pReq("deleteCont", data);
const likeContent = (data) => pReq("likeContent", data);
const unlikeContent = (data) => pReq("unlikeContent", data);
const uploadImg = (data) => pReq("uploadImg", data);

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