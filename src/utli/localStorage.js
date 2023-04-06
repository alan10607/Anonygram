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