import i18n from 'i18next';
import { SET_USER, DELETE_USER } from "../actions/user";
import { setTheme } from 'util/themeUtil';
import { isAnonygramUser } from 'util/authUtil';
const initUserState = {
  id: null,
  username: "",
  isAnonymous: null,
  headUrl: "",
  language: "en",
  theme: "d"
};

export default function userReducer(preState = initUserState, action) {
  const { type, data } = action;

  switch (type) {
    case SET_USER:
      const newState = Object.assign({}, preState, data);
      setLocalEnvironment(newState);
      newState.isAnonymous = isAnonygramUser(newState);
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