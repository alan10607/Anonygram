import { PROTOCOL, LOCALHOST, METHOD_POST } from "./constant";
import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: protocol + "//" + localhost + "/"
  baseURL: `https://localhost/`,
  headers: {"Content-Type" : "application/json"},
  rejectUnauthorized: false //for test disable ssl
});

export const postApi = async (url, data = {}) => {
  try{
    const res = await axiosInstance.post("post/" + url, data);
    return Promise.resolve(res.data.result);
  }catch(e){
    console.log(e.response.data.result || e.message || e);
    return Promise.reject(e);
  }
}

export const userApi = async (url, data = {}) => {
  try{
    const res = await axiosInstance.post("user/" + url, data);
    return Promise.resolve(res.data.result);
  }catch(e){
    console.log(e.response.data.result || e.message || e);
    return Promise.reject(e);
  }
}