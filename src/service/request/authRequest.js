import request from ".";

const test = () => request.getMethod(
  `/auth/test`
);

const login = (email, password) => request.postMethod(
  `/auth/login`, 
  {email, password}
);

const anonymous = () => request.postMethod(
  `/auth/anonymous`
);

const register = (username, email, password) => request.postMethod(
  `/auth/register`, 
  { username, email, password }
);

const ssl = () => request.getMethod(
  `/ssl`
);

export default {
  test,
  login,
  anonymous,
  register,
  ssl
};