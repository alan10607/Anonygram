import i18n from 'i18next';
import { SET_USER, DELETE_USER } from "../actions/user";
import { setTheme } from 'util/theme';
const initUserState = {
  id: null,
  username: "",
  isAnonymous: null,
  headUrl: "",
  language: "en",
  theme: "dark"
};

export default function userReducer(preState = initUserState, action) {
  const { type, data } = action;

  switch (type) {
    case SET_USER:
      data.isAnonymous = checkIsAnonymous(data);
      const newState = Object.assign({}, preState, data);
      setLocalEnvironment(newState);
      return newState;

    case DELETE_USER:
      setLocalEnvironment(initUserState);
      return initUserState;

    default:
      return preState;
  }
}

const checkIsAnonymous = (user) => {
  return user.email === "";
}

const setLocalEnvironment = (state) => {
  i18n.changeLanguage(state.language);
  setTheme(state.theme);
}