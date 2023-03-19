import { useState, useEffect } from "react";

export const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    localStorage.getItem(key) ? initValue : JSON.parse(localStorage.getItem(key));
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};