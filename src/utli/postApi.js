import { PROTOCOL, LOCALHOST, METHOD_POST } from "../constant";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: protocol + "//" + localhost + "/"
  baseURL: `https://localhost/post/`,
  headers: {"Content-Type" : "application/json"},
  rejectUnauthorized: false //for test disable ssl
});

export default async function postApi (url, data = {}) {
  try{
    const res = await axiosInstance.post(url, data);
    return Promise.resolve(res.data.result);
  }catch(e){
    console.log(e.response.data.result || e.message || e);
    return Promise.reject(e);
  }
  // return new Promise((resolve, reject) => {
  //   axiosInstance.post(url, data).then((res) => {
  //     resolve(res.data.result);
  //   }).catch((e) => {
  //     console.log(e);
  //     if(e.response && e.data && e.data.result)
  //       reject(e.response.data.result);
  //   });
  // });
};

