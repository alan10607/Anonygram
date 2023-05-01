import { SAVE_USER_DATA, RESET_USER_DATA } from "../actions/user";

const initState = {
  userId: "",
  username: "",
  isAnonyUser: true
};

export default function userReducer(preState = initState, action) {
  const { type, data } = action;

  switch (type) {
    case SAVE_USER_DATA:
      const { id: userId, sub: username, isAnonymous: isAnonyUser } = data;
      return Object.assign({}, preState, { userId, username, isAnonyUser });

    case RESET_USER_DATA:
      return initState;

    default:
      return preState;
  }
}