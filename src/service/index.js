import axios from "axios";
import { deleteJwt, getJwt, setJwt } from "./jwt";
import { addPending, removePending } from "./pending";
import { locationLocalTo } from "../util/locationTo";
import { BACKEND_API_URL } from "../util/constant";

const service = axios.create({
  baseURL: BACKEND_API_URL,
  headers: { "Content-Type": "application/json" },
  rejectUnauthorized: true, //false for test disable ssl
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
  config.headers["startTime"] = new Date().getTime();
  return config;
}, error => {
  Promise.reject(error);
})

service.interceptors.response.use(res => {
  removePending(res.config);

  if (res.config.url === "auth/login" || res.config.url === "auth/anony") {
    const jwt = res.data.result.token;
    setJwt(jwt);
  }

  const startTime = res.config.headers["startTime"];
  const endTime = new Date().getTime();
  console.log(`>> Request in ${endTime - startTime}ms for ${res.config.url}`);

  return res;
}, error => {
  if (axios.isCancel(error)) {
    console.log(`Repeated request cancel: ${error.config.url}`);
    return Promise.reject(error);
  } 
  
  if (error?.response?.status === 403) {
    console.log("Jwt is expired, location to /login");
    deleteJwt();
    locationLocalTo("/login");
    return;
  }

  console.error(`Response error: ${error.config.url}`, 
    error.response?.data?.result || error.message || error);

  return Promise.reject(error);
})

export default service;