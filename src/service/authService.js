import { getRequest, postRequest } from ".";

const pReq = (path, data) => postRequest(`auth/${path}`, data);
const login = (data) => pReq("login", data);
const anony = (data) => pReq("anony", data);
const register = (data) => pReq("register", data);

const testSsl = (data) => getRequest(`ssl`, data);//用來測試後台的ssl憑證, 測試用

export default {
  login,
  anony,
  register,
  testSsl
};