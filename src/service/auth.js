import { post } from "./api";

const http = (path, data) => post(`auth/${path}`, data);
const login = (data) => http("login", data);
const anony = (data) => http("anony", data);
const register = (data) => http("register", data);

export default {
  login,
  anony,
  register
};