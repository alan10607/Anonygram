const pending = new Map();//to store accumulated requests

const getHash = (config) => {
  const stringify = (obj) => typeof obj === "string" ? obj : JSON.stringify(obj);
  return [
    config.method,
    config.url,
    stringify(config.params),
    stringify(config.data)
  ].join("&");
}

export const addPending = (config) => {
  const hash = getHash(config);
  const controller = new AbortController();
  config.signal = controller.signal;
  if (!pending.has(hash)) {
    pending.set(hash, controller);
  }
}

export const removePending = (config) => {
  const hash = getHash(config);
  if (pending.has(hash)) { 
    const controller = pending.get(hash)
    controller.abort();
    pending.delete(hash);
  }
}

export const clearPending = () => {
  for (const [hash, controller] of pending) {
    controller.abort();
  }
  pending.clear()
}