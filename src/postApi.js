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

export default function postApi(url, data, afterFunc, errorFunc){
  if(!afterFunc) afterFunc = () => {};
  if(!errorFunc) errorFunc = () => {};

  return new Promise((resolve, reject) => {
    baseRequest.post(url, data)
      .then((res) => {
        afterFunc(res.data.result)
      }).catch((e) => {
        console.log(e);
        errorFunc(e);
      });
  });
};