import { useState, useEffect } from "react";

export default function useLocalStorage(key, initValue) {
  const [value, setValue] = useState(getLocalStorage(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log("Set localStorage:", key, "=", value);
  }, [key, value]);


  return [value, setValue];
};

export const getLocalStorage = (key, initValue = null) => {
  if(!localStorage.getItem(key)) return initValue;
  try{
    return JSON.parse(localStorage.getItem(key));
  }catch(e){
    console.error(e);
  }
  return initValue;
}
