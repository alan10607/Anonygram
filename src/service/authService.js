import { request } from ".";

const req = (path, data) => request(`auth/${path}`, data);
const login = (data) => req("login", data);
const anony = (data) => req("anony", data);
const register = (data) => req("register", data);

export default {
  login,
  anony,
  register
};