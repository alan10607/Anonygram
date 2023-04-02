import { useEffect } from 'react';
import useLocalStorage, { getLocalStorage } from "./useLocalStorage";
import { JWT_TOKEN } from "./constant";

const getJwt = () => getLocalStorage(JWT_TOKEN);

const getPayload = (jwt = getJwt()) => {
  let payload = {

  };
  if(jwt) payload = JSON.parse(window.atob(jwt.split('.')[1]));
  return payload;
}

const isValid = (exp = getPayload(getJwt()).exp) => exp > Math.floor(Date.now() / 1000);

export const Jwt = {
  getJwt,
  getPayload,
  isValid
}

export default function useJwt() {
  const [jwt, setJwt] = useLocalStorage(JWT_TOKEN, null);
  const payload = getPayload(jwt);
  const valid = isValid(payload.exp);

  useEffect(() => {
    if (!valid) {
      setJwt(null);
      console.log("Jwt is expired");
    }
  })
  
  return { jwt, setJwt, payload, valid };
}