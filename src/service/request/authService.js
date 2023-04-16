import request from ".";

const login = ({email, pw}) => request.postMethod("auth/login", {email, pw});
const anony = () => request.postMethod("auth/anony", {});
const register = ({ email, userName, pw }) => request.postMethod("auth/register", { email, userName, pw });
const testSsl = () => request.getMethod(`ssl`, {});//用來測試後台的ssl憑證, 測試用

export default {
  login,
  anony,
  register,
  testSsl
};