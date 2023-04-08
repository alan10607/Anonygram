/*
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PROTOCOL, DOMAIN, JWT_TOKEN, JWT_TOKEN_EXP } from "./constant"; 
import useJwt from "./useJwt";

const axiosInstance = axios.create({
  baseURL: `${PROTOCOL}//${DOMAIN}/`,
  headers: {"Content-Type" : "application/json"},
  rejectUnauthorized: false //for test disable ssl
});

export class TokenExpiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TokenExpiredError';
  }
}

export default function useAxios(url) {
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const controller = useRef(new AbortController());
  const cancel = () => controller.current.abort();
  const { jwt, isValid } = useJwt();

  const config = {
    signal : controller.current.signal,
    headers : { Authorization : `Bearer ${jwt}` } 
  };
  
  const fetchData = async (data = {}) => {
    setLoading(true);
    const timer = setTimeout(() => {
      cancel();
      setError(new Error("Request timeout :" + url));
    }, 30 * 1000);

    try{
      if (!isValid)
        throw new TokenExpiredError(url);

      const res = await axiosInstance.post(url, data, config);

      if (!res.data) 
        throw new Error("Response format error: " + url);
      
      setRes(res.data.result);
    }catch(e){
      console.log(e.response.data.result || e.message || e);
      setError(e);
    }finally{
      clearTimeout(timer);
      setLoading(false);
    }
  }

  return [fetchData, res, error, loading];
}

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
*/