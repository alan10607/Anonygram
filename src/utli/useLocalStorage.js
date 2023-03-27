import { useState, useEffect } from "react";

export default function useLocalStorage(key, initValue) {
  const [value, setValue] = useState(
    localStorage.getItem(key) ? 
    JSON.parse(localStorage.getItem(key)) : 
    initValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("Set localStorage:", key, "=", value);
  }, [key, value]);


  return [value, setValue];
};