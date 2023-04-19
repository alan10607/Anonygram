import { getLocalStorage, setLocalStorage } from "../util/localStorage";
import { JWT_TOKEN } from "../util/constant";

export const getJwt = () => {
  return getLocalStorage(JWT_TOKEN);
}

export const getJwtPayload = (jwt = getJwt()) => {
  return jwt ? JSON.parse(window.atob(jwt.split('.')[1])) : {};
}

export const isJwtValid = (jwt = getJwt()) => {
  const exp = getJwtPayload(jwt).exp;
  return exp > Math.floor(Date.now() / 1000);
}

export const setJwt = (value) => {
  setLocalStorage(JWT_TOKEN, value);
}

export const deleteJwt = () => {
  setJwt(null);
}