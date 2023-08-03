import axiosInstance from "..";

const getMethod = (url, parameter = {}) => {
  return axiosInstance.get(url, { parameter });
}

const postMethod = (url, payload = {}) => {
  return axiosInstance.post(url, payload);
}

const putMethod = (url, payload = {}) => {
  return axiosInstance.put(url, payload);
}

const patchMethod = (url, payload = {}) => {
  return axiosInstance.patch(url, payload);
}

const deleteMethod = (url, payload = {}) => {
  return axiosInstance.delete(url, { data: payload });
}

export default {
  getMethod,
  postMethod,
  putMethod,
  patchMethod,
  deleteMethod
};