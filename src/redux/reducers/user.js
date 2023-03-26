import { SAVE_USER_DATA } from "../actions/user";

const initState = {
  username : null,
  isAnony : false,
  jwtToken : null,
};

export default function userReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SAVE_USER_DATA:
      let exp = -1;
      const jwtToken = data.jwtToken;
      if(jwtToken){
        const payload = JSON.parse(window.atob(jwtToken.split('.')[1]));
        exp = payload.exp;
      }

      return Object.assign({}, preState, {
        username : data.userName,
        isAnony : data.isAnonumousId,
        jwtToken : data.jwtToken,
      });

    default:
      return preState;
  }
}