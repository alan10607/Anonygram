import Cookies from 'universal-cookie'

const cookies = new Cookies();

export const getCookie = (key) => {
  return cookies.get(key);
}

export const setCookie = (key, value, expiredDays) => {
  cookies.set(key, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * expiredHour,
    secure: true,
    sameSite: true
  });
}