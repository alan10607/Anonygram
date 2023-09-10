import i18n from 'i18next';
import { isAnonygramUser } from 'util/authUtil';
import { setTheme } from 'util/themeUtil';
import { DELETE_USER, SET_USER } from "../actions/user";

const initUserState = {
  tokens: null,//for situation when phone's browser rejects cross-site cookies
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
      const newState = Object.assign({}, preState, data);
      newState.isAnonymous = isAnonygramUser(newState);
      setLocalEnvironment(newState);
      return newState;

    case DELETE_USER:
      setLocalEnvironment(initUserState);
      return initUserState;

    default:
      return preState;
  }
}

const setLocalEnvironment = (state) => {
  i18n.changeLanguage(state.language);
  setTheme(state.theme);
}