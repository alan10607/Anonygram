export const locationReload = (t = 0) => {
  setTimeout(() => window.location.reload(true), t);
}

export const locationLocalTo = (url = "/") => {
  locationTo(process.env.PUBLIC_URL + url);
}

export const locationTo = (url) => {
  window.location.href = url;
}