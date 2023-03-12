import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';

export default function Console() {
  const [isClose, setIsClose] = useState(true);
  const dispatch = useDispatch();
  const {consoleStr} = useSelector(state => ({
    consoleStr : state.console.consoleStr
  }));

  useEffect(() => {
    if(consoleStr === "") return;

    setIsClose(false);
    const closeTimeout = setTimeout(() => setIsClose(true), 3000);
    return () => {
      clearTimeout(closeTimeout);
    }
  }, [consoleStr])
    
  //     if(needReload) {
//       window.location.reload(true);//監測有無需要跳轉
//     }

  return (
    <div id="console" className={isClose ? "console-close" : "console-open"}>
      {consoleStr}
    </div>
  )
  
}
