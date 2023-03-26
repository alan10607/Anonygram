import { useEffect } from 'react';
import useLocalStorage from "./useLocalStorage";
import { JWT_TOKEN, JWT_TOKEN_EXP } from "./constant";

export default function useJwt() {
  const [token, setToken] = useLocalStorage(JWT_TOKEN, "");
  const [tokenExp, setTokenExp] = useLocalStorage(JWT_TOKEN_EXP, -1);

  const getExp = (jwtToken) => {
    if(jwtToken){
      const payload = JSON.parse(window.atob(jwtToken.split('.')[1]));
      return payload.exp;
    }
    return -1;
  }

  useEffect(() => {
    setTokenExp(getExp(token));
  }, [token])

  return [token, setToken, tokenExp];
}