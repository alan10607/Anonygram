import axios from "axios";
import { reload } from "./reolad";
import { PROTOCOL, DOMAIN, JWT_TOKEN, JWT_TOKEN_EXP } from "./constant";

export const axiosInstance = axios.create({
  baseURL: `${PROTOCOL}//${DOMAIN}/`,
  headers: {"Content-Type" : "application/json"},
  rejectUnauthorized: false //for test disable ssl
});

export const postApi = (path, data) => api(path, data, "/post");
export const userApi = (path, data) => api(path, data, "/user");

const api = async (path, data = {}, method = "") => {
  if(!isTokenValid()) return reload();

  const url = `${method}/${path}`;
  try{
    const res = await axiosInstance.post(url, data, getHeader());
    if(!res.data || !res.data.result) throw "Response format error: " + url;
    return Promise.resolve(res.data.result);
  }catch(e){
    console.log(e.response.data.result || e.message || e);
    return Promise.reject(e);
  }
}

const getHeader = () => {
  const token = JSON.parse(localStorage.getItem(JWT_TOKEN));
  return token ? { headers : { Authorization : `Bearer ${token}` } } : {}; 
};

const isTokenValid = () => {
  const exp = localStorage.getItem(JWT_TOKEN_EXP);
  const now = Math.floor(Date.now() / 1000);
  return exp > now;
}