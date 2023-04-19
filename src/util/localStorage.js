import { useState, useEffect } from "react";

export const getLocalStorage = (key, initValue = null) => {
  if(!localStorage.getItem(key)) return initValue;
  try{
    return JSON.parse(localStorage.getItem(key));
  }catch(e){
    console.error(e);
  }
  return initValue;
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function useLocalStorage(key, initValue) {
  const [value, setValue] = useState(getLocalStorage(key, initValue));

  useEffect(() => {
    setLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue];
};