import request from ".";

const updateLanguage = (language) => request.patchMethod(
  `/user`,
  { language }
);

const updateTheme = (theme) => request.patchMethod(
  `/user`,
  { theme }
);

const updateHeadUrl = (headUrl) => request.patchMethod(
  `/user`,
  { headUrl }
);

export default {
  updateLanguage,
  updateTheme,
  updateHeadUrl
};