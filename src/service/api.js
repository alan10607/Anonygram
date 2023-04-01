import axios from "axios";
import { reload } from "../utli/reolad";
import { PROTOCOL, DOMAIN } from "../utli/constant";
import { Jwt } from "../utli/useJwt";

class TokenExpiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TokenExpiredError';
  }
}

const baseConfig = {
  baseURL: `${PROTOCOL}//${DOMAIN}/`,
  headers: { "Content-Type": "application/json" },
  rejectUnauthorized: false, //for test disable ssl
  timeout: 5000,
  // responseEncoding: 'utf8',
  // withCredentials: false, // default
  // xsrfCookieName: 'XSRF-TOKEN', // default
  // xsrfHeaderName: 'X-XSRF-TOKEN', // default
}

const getConfig = () => {
  const controller = new AbortController();
  const signal = controller.signal;
  const cancel = () => controller.abort();
  const config = { ...baseConfig, signal };
  return [config, cancel];
}

const getJwtConfig = () => {
  if (!Jwt.isValid()) throw new TokenExpiredError();

  const jwt = Jwt.getJwt();
  const bearer = { Authorization: `Bearer ${jwt}` };
  let [config, cancel] = getConfig();
  config.headers = { ...config.headers, bearer }
  return [config, cancel];
}

const fetchData = async (request, cancel) => {
  // const timer = setTimeout(() => {
  //   cancel();
  //   console.log("Request timeout:" + request);
  // }, 5 * 1000);

  try {
    const res = await request();
    if (!res.data) throw Error("Response format error:" + request);
    return Promise.resolve(res.data.result);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  } finally {
    // clearTimeout(timer);
  }
}

export const post = (url, data = {}) => {
  let [config, cancel] = getConfig();
  const request = () => axios.post(url, data, config);
  return fetchData(request, cancel);
}

export const postWithJwt = (url, data = {}) => {
  let [config, cancel] = getJwtConfig();
  const request = () => axios.post(url, data, config);
  return fetchData(request, cancel);
}