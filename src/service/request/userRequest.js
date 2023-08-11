import request from ".";

const get = () => request.getMethod(
  `/user`
);

const update = (language, theme) => request.patchMethod(
  `/user`, 
  {language, theme}
);

const updateHeadUrl = (imageBase64) => request.patchMethod(
  `/user/headUrl`,
  {imageBase64}
);


export default {
  get,
  update,
  updateHeadUrl
};