import axios from "axios";
import { BACKEND_API_URL } from "../utli/constant";
import { getJwt, isJwtValid, deleteJwt } from "../utli/jwt";
import { locationTo } from "../utli/reolad";

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
    locationTo("/login");
  }
  const jwtConfig = Object.assign({}, config);
  jwtConfig.headers["Authorization"] = `Bearer ${jwt}`;
  return getInstance(jwtConfig);
}

const fetchData = async (url, data = {}, instance) => {
  try{
    const res = await instance.post(url, data);
    if(!res.data) throw "Response format error: " + url;
    return Promise.resolve(res.data.result);
  }catch(e){
    console.error("Api error:", e.response?.data?.result || e.message || e);
    return Promise.reject(e);
  }
}

export const request = (url, data) => fetchData(url, data, getInstance());

export const jwtRequest = (url, data) => fetchData(url, data, getJwtInstance());