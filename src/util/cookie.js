export const getCookie = (key) => {
  return document.cookie
          .split("; ")
          .find((row) => row.startsWith(key))
          ?.split("=")[1];
}

export const setCookie = (key, value, expdays) => {
  const expTime = new Date();
  expTime.setTime(expTime.getTime() + (expdays * 24 * 60 * 60 * 1000));
  document.cookie = `${key}=${value}; expires=${expTime.toUTCString()};`;
}