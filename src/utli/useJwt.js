import { useEffect } from 'react';
import useLocalStorage from "./useLocalStorage";
import { JWT_TOKEN, JWT_TOKEN_EXP } from "./constant";

export default function useJwt() {
  const [jwt, setJwt] = useLocalStorage(JWT_TOKEN, null);
  const payload = getPayload(jwt);

  useEffect(() => {
    if (payload.exp > -1 && payload.exp < Math.floor(Date.now() / 1000)) {
      setJwt(null);
      console.log("Jwt is expired");
    }
  })
  
  return {jwt, setJwt, payload};
}

export const getPayload = (jwt) => jwt ? 
  JSON.parse(window.atob(jwt.split('.')[1])) : 
  {
    isAnonymous : false,
    sub : "???",
    iat : -1,
    exp : -1
  };