import axios from "axios";
import { deleteJwt, getJwt, setJwt } from "./jwt";
import { addPending, removePending } from "./pending";
import { locationLocalTo } from "../util/locationTo";
import { BACKEND_API_URL } from "../util/constant";

const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  headers: { "Content-Type": "application/json" },
  rejectUnauthorized: true, //false for test disable ssl
  timeout: 5000,
  withCredentials: true, // default
  xsrfCookieName: 'XSRF-TOKEN',// name of the csrf cookie
  xsrfHeaderName: 'X-XSRF-TOKEN'// name of the csrf http header
  // responseEncoding: 'utf8',
})

const generateCsrfToken = () => {
  return self.crypto.randomUUID();
}

const cancelRepeatedRequest = (config) => {
  removePending(config);//remove older 
  addPending(config);//then add new one
}

const setCsrf = (config) => {
  const csrf = generateCsrfToken();
  config.headers["XSRF-TOKEN"] = csrf;
  config.headers["X-CSRF-TOKEN"] = csrf;
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

axiosInstance.interceptors.request.use(config => {
  cancelRepeatedRequest(config);
  setCsrf(config);
  setJwt(config);
  setStartTime(config);
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

  return res;
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
    error.response?.data?.result || error.message || error);

  return Promise.reject(error);
})

export default axiosInstance;