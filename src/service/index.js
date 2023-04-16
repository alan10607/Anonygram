import axios from "axios";
import { locationLocalTo } from "../utli/reolad";
import { deleteJwt, getJwt, setJwt } from "./jwt";
import { addPending, removePending } from "./pending";
import { BACKEND_API_URL } from "../utli/constant";

const service = axios.create({
  baseURL: BACKEND_API_URL,
  headers: { "Content-Type": "application/json" },
  rejectUnauthorized: false, //for test disable ssl
  timeout: 5000
  // responseEncoding: 'utf8',
  // withCredentials: false, // default
  // xsrfCookieName: 'XSRF-TOKEN', // default
  // xsrfHeaderName: 'X-XSRF-TOKEN', // default
})

service.interceptors.request.use(config => {
  removePending(config);//先刪除舊的request
  addPending(config);//再加入新的

  config.headers["Authorization"] = `Bearer ${getJwt()}`;//add Jwt
  return config;
}, error => {
  Promise.reject(error);
})

service.interceptors.response.use(res => {
  removePending(res.config);

  if (res.status === 403  /* &&//if(...jwt失效)*/) {
    //if(...jwt失效)
    console.log("Jwt is expired, location to /login");
    deleteJwt();
    return locationLocalTo("/login");
  }

  if (res.status !== 200) {
    return Promise.reject(res.status);//返回错误码
  }

  if (res.config.url === "auth/login" || res.config.url === "auth/anony") {
    const jwt = res.data.result.token;
    setJwt(jwt);
    console.log("Login get jwt", jwt);
  }

  return res;
}, error => {
  if (axios.isCancel(error)) {
    console.log(`Repeated request cancel: ${error.config.url}`)
  } else {
    console.error(`Response error: ${error.config.url}`, 
      error.response?.data?.result || error.message || error);
  }
  return Promise.reject(error);
})

export default service;