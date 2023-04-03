import { JWT_TOKEN } from "./constant";

const getLocalStorage = (key, initValue = null) => {
  if(!localStorage.getItem(key)) return initValue;
  try{
    return JSON.parse(localStorage.getItem(key));
  }catch(e){
    console.error(e);
  }
  return initValue;
}

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getJwt = () => getLocalStorage(JWT_TOKEN);
export const getJwtPayload = (jwt = getJwt()) => jwt ? JSON.parse(window.atob(jwt.split('.')[1])) : {};
export const isJwtValid = (exp = getJwtPayload().exp) => exp > Math.floor(Date.now() / 1000);
export const setJwt = (value) => setLocalStorage(JWT_TOKEN, value);
export const deleteJwt = () => setJwt(null);