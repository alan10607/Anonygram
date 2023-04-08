import axios from "axios";
import { BACKEND_API_URL } from "../utli/constant";
import { getJwt, isJwtValid, deleteJwt } from "../utli/jwt";
import { locationLocalTo } from "../utli/reolad";

const config = {
  baseURL: BACKEND_API_URL,
  headers: {"Content-Type" : "application/json"},
  rejectUnauthorized: false, //for test disable ssl
  timeout: 5000
  // responseEncoding: 'utf8',
  // withCredentials: false, // default
  // xsrfCookieName: 'XSRF-TOKEN', // default
  // xsrfHeaderName: 'X-XSRF-TOKEN', // default
}

const getInstance = (axiosConfig = config) => {
  return axios.create(axiosConfig);
}

const getJwtInstance = () => {
  const jwt = getJwt();
  if(!jwt || !isJwtValid(jwt)) {
    console.log("Get expired Jwt when api request");
    deleteJwt()
    locationLocalTo("/login");
  }
  const jwtConfig = Object.assign({}, config);
  jwtConfig.headers["Authorization"] = `Bearer ${jwt}`;
  return getInstance(jwtConfig);
}

const postPromise = async (url, data = {}, instance) => {
  try{
    const res = await instance.post(url, data);
    if(!res.data) throw `Post format error: ${url}`;
    return Promise.resolve(res.data.result);
  }catch(e){
    console.error(`Post error: ${url}`, e.response?.data?.result || e.message || e);
    return Promise.reject(e);
  }
}

const getPromise = async (url, data = {}, instance) => {
  try{
    const res = await instance.get(url, { params: data })
    return Promise.resolve(res.data);
  }catch(e){
    console.error(`Get error: ${url}`, e.message || e);
    return Promise.reject(e);
  }
}

export const getRequest = (url, data) => getPromise(url, data, getInstance());

export const postRequest = (url, data) => postPromise(url, data, getInstance());

export const jwtPostRequest = (url, data) => postPromise(url, data, getJwtInstance());