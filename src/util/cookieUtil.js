import Cookies from 'universal-cookie'

const cookies = new Cookies();

export const getCookie = (key) => {
  return cookies.get(key);
}

export const setCookie = (key, value, expiredSecond) => {
  cookies.set(key, value, {
    path: "/",
    maxAge: 60 * expiredSecond,
    secure: true
  });
}