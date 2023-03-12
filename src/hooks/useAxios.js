import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PROTOCOL, LOCALHOST, METHOD_POST } from '../constant';

const test = () => {
  console.log("reolad?");
  return axios.create({
    baseURL: `${PROTOCOL}//${LOCALHOST}/${METHOD_POST}/`,
    headers: {"Content-Type" : "application/json"},
    rejectUnauthorized: false //for test disable ssl
  });
}

const axiosInstance = test();

export default function useAxios  (url)  {
  const [res, setRes] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const controller = useRef(new AbortController());
  const cancel = () => controller.current.abort();
  const fetchData = async (data = {}) => {
    setLoading(true);
    try{
      const res = await axiosInstance.post(url, data, {signal : controller.current.signal});
      setRes(res.data.result);
    }catch(e){
      console.log(e);
      setError(e);
    }finally{
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   fetchData();
  // }, [url, data]);
  console.log("!", res, error, loading);

  return [fetchData, res, error, loading, cancel];
}
