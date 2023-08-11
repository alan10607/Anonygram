import { SET_USER, DELETE_USER } from "../actions/user";

const initUserState = {
  userId: null,
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
      return Object.assign({}, preState, data);

    case DELETE_USER:
      return initUserState;

    default:
      return preState;
  }
}