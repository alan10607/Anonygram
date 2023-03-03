
import axios from 'axios';

const protocol = window.location.protocol;
const localhost = window.location.host;
const postApiName = "post";
const baseRequest = axios.create({
  // baseURL: protocol + "//" + localhost + "/"
  baseURL: "https:" + "//" + "localhost" + "/" + postApiName + "/",
  headers: {"Content-Type" : "application/json"},
  rejectUnauthorized: false //for test disable ssl
});

export const postAndDispatch = (url, data, dispatch, afterFunc, errorFunc) => {
  if(!afterFunc) afterFunc = () => {};
  if(!errorFunc) errorFunc = () => {};
  return new Promise((resolve, reject) => {
    baseRequest.post(url, data)
      .then((res) => {
        dispatch(afterFunc(res.data.result));
      }).catch((e) => {
        console.log(e);
        dispatch(errorFunc(e));
      });
  });
};

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    baseRequest.post(url, data).then((res) => {
      resolve(res.data.result);
    }).catch((e) => {
      console.log(e.response.data.result);
      reject(e.response.data.result);
    });
  });
};