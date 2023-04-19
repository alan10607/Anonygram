import { useRef } from 'react';

export default function useThrottle(func, time = 500) {
  const isRunningRef = useRef(false);

  return (...args) => {
    if (isRunningRef.current){
      return;
    } 

    isRunningRef.current = true;
    func(...args);
    setTimeout(() => { 
      isRunningRef.current = false 
    }, time);
  }
}