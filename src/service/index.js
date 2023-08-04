import axios from "axios";
import { addPending, removePending } from "./pending";
import { locationLocalTo } from "../util/locationTo";
import { BACKEND_API_URL } from "../util/constant";
import { setCookie } from "util/cookie";

const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  headers: { "Content-Type": "application/json" },
  rejectUnauthorized: true, //false for test disable ssl
  timeout: 30000,
  withCredentials: true // default
  // xsrfCookieName: 'your_csrf_cookie_name_here',
  // xsrfHeaderName: 'X-CSRF-TOKEN'// name of the csrf http header
  // responseEncoding: 'utf8',
})


const cancelRepeatedRequest = (config) => {
  removePending(config);//remove older 
  addPending(config);//then add new one
}


const setJwt = (config) => {
  // config.headers["Authorization"] = `Bearer ${getJwt()}`;//add Jwt
}

const setStartTime = (config) => {
  config.headers["startTime"] = new Date().getTime();
}

const getDurationTime = (config) => {
  const startTime = config.headers["startTime"];
  const endTime = new Date().getTime();
  return endTime - startTime;
}

const setCsrf = (config) => {
  const csrfToken = crypto.randomUUID();
  setCookie('X-CSRF-TOKEN', csrfToken, 1);
  config.headers['X-CSRF-TOKEN'] = csrfToken;
}

axiosInstance.interceptors.request.use(config => {
  cancelRepeatedRequest(config);
  setCsrf(config);
  setJwt(config);
  setStartTime(config);
  console.log("sending" , config.url, config.headers)
  return config;
}, error => {
  Promise.reject(error);
})

axiosInstance.interceptors.response.use(res => {
  removePending(res.config);

  // if (res.config.url === "/auth/login" || res.config.url === "/auth/anony") {
  //   const jwt = res.data.result.token;
  //   setJwt(jwt);
  // }

  const durationTime = getDurationTime(res.config);
  console.log(`>> Request in ${durationTime}ms for ${res.config.url}`);

  return res.data;
}, error => {
  if (axios.isCancel(error)) {
    console.log(`Repeated request is canceled: ${error.config.url}`);
    return Promise.reject(error);
  } 
  
  if (error?.response?.status === 403) {
    console.log("Jwt is expired, location to /login");
    locationLocalTo("/login");
    return;
  }

  console.error(`Response error: ${error.config.url}`, 
    error.response?.data?.error || error.message || error);

  return Promise.reject(error);
})

export default axiosInstance;