import request from ".";

export default {
  create: (base64) =>
    request.postMethod(`/image`, { base64 })
};