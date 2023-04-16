import service from "..";

const getMethod = async (url, params = {}) => {
  try{
    const res = await service.get(url, { params })
    return Promise.resolve(res.data);
  }catch(e){
    console.log(e);
    return Promise.reject(e);
  }
}

const postMethod = async (url, data = {}) => {
  try{
    const res = await service.post(url, data);
    if(!res.data) throw `Post format error: ${url}`;
    return Promise.resolve(res.data.result);
  }catch(e){
    console.log(e);
    return Promise.reject(e);
  }
}

export default {
  getMethod,
  postMethod
};