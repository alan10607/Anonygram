export const reload = (t = 0) => {
  // debugger
  // setTimeout(() => window.location.reload(true), t);
}

export const direct = (path) => {
  window.location.href = path;
}