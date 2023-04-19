import service from "..";

const getMethod = async (url, params = {}) => {
  try{
    const res = await service.get(url, { params })
    return Promise.resolve(res.data);
  }catch(e){
    return Promise.reject(e);
  }
}

const postMethod = async (url, data = {}) => {
  try{
    const res = await service.post(url, data);
    if(!res.data) {
      const err = new Error(`Post format error: ${url}`);
      console.log(err);
      throw err;
    }
    return Promise.resolve(res.data.result);
  }catch(e){
    return Promise.reject(e);
  }
}

export default {
  getMethod,
  postMethod
};