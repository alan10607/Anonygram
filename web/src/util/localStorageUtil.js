import { useState, useEffect } from "react";

export const getLocalStorage = (key, initValue = null) => {
  if (!localStorage.getItem(key)) return initValue;
  try {
    let value = localStorage.getItem(key);
    return value === "null" ? null : JSON.parse(value);
  } catch (e) {
    console.error(e);
  }
  return initValue;
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value ? JSON.stringify(value) : null);
}

export default function useLocalStorage(key, initValue) {
  const [value, setValue] = useState(getLocalStorage(key, initValue));

  useEffect(() => {
    setLocalStorage(key, value);
  }, [key, value, setValue]);

  return [value, setValue];
};