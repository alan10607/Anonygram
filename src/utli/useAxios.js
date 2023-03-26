import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PROTOCOL, DOMAIN, JWT_TOKEN, JWT_TOKEN_EXP } from "./constant";

const axiosInstance = axios.create({
  baseURL: `${PROTOCOL}//${DOMAIN}/`,
  headers: {"Content-Type" : "application/json"},
  rejectUnauthorized: false //for test disable ssl
});

class BackendFormatError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BackendFormatError';
  }
}

export default useAxios = (url) => {
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const controller = useRef(new AbortController());
  const cancel = () => controller.current.abort();
  const [token, setToken, tokenExp] = useJwt();
  const config = {
    signal : controller.current.signal,
    headers : { Authorization : `Bearer ${token}` } 
  };
  debugger;
  
  const fetchData = async (data = {}) => {
    setLoading(true);
    const timer = setTimeout(() => {
      cancel();
      setError(new Error("Request timeout :" + url));
    }, 30 * 1000);

    try{
      if (!tokenExp || tokenExp < Math.floor(Date.now() / 1000)) {
        setToken("");
        throw new Error("Token expired error: " + url);
      }

      const res = await axiosInstance.post(url, data, config);

      if(!res.data || !res.data.result) 
        throw new BackendFormatError("Response format error: " + url);
      
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