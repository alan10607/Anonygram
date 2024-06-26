import axios from "axios";
import store from "redux/store";
import { BACKEND_API_URL, JWT_TOKEN } from "config/constant";
import { setUser } from "redux/actions/user";
import { setCookie } from "util/cookieUtil";
import { locationLocalTo } from "util/locationUtil";
import { addPending, removePending } from "./pending";
import { getLocalStorage } from "util/localStorageUtil";


const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  headers: { "Content-Type": "application/json" },
  rejectUnauthorized: true, //false for test disable ssl
  timeout: 30000,
  withCredentials: true //for cors
  // xsrfCookieName: 'your_csrf_cookie_name_here',
  // xsrfHeaderName: 'X-CSRF-TOKEN'// name of the csrf http header
  // responseEncoding: 'utf8',
})

const cancelRepeatedRequest = (config) => {
  removePending(config);//remove older 
  addPending(config);//then add new one
}

const setDoubleSubmitCsrf = (config) => {
  const csrfToken = crypto.randomUUID();
  setCookie("X-CSRF-TOKEN", csrfToken, 60);
  config.headers["X-CSRF-TOKEN"] = csrfToken;
}

const setStartTime = (config) => {
  config.headers["startTime"] = new Date().getTime();
}

const getDurationTime = (config) => {
  const startTime = config.headers["startTime"];
  const endTime = new Date().getTime();
  return endTime - startTime;
}

const setJwtTokens = (config) => {
  const token = getLocalStorage(JWT_TOKEN);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
}

const saveJwtTokens = (headers) => {
  const setJwt = headers["set-jwt"] || headers["Set-Jwt"];
  if (setJwt) {
    const tokens = JSON.parse(setJwt);
    store.dispatch(setUser({ tokens }));
    console.log("Save JWT tokens");
  }
}

axiosInstance.interceptors.request.use(config => {
  cancelRepeatedRequest(config);
  // setDoubleSubmitCsrf(config);
  setJwtTokens(config);
  setStartTime(config);
  return config;
}, error => {
  Promise.reject(error);
})

axiosInstance.interceptors.response.use(res => {
  removePending(res.config);
  saveJwtTokens(res.headers);

  console.log(`>> Request in ${getDurationTime(res.config)}ms for ${res.config.method.toUpperCase()}:${res.config.url}`);
  return res.data;
}, error => {
  if (axios.isCancel(error)) {
    console.log(`Repeated request is canceled: ${error.config.url}`);
    return Promise.reject(error);
  }

  if (error?.response?.status === 403) {
    console.log("Authentication is expired, redirect to /login");
    locationLocalTo("/login");
    return Promise.reject(error);
  }

  console.error(`Response error: ${error.config.url}`,
    error.response?.data?.error || error.response?.data || error.message || error);

  return Promise.reject(error);
})

export default axiosInstance;