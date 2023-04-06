export const locationReload = (t = 0) => {
  setTimeout(() => window.location.reload(true), t);
}

export const locationTo = (url = "/") => {
  window.location.href = process.env.PUBLIC_URL + url;
}