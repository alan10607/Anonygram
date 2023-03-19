import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.css';

export default function Console() {
  const [isClose, setIsClose] = useState(true);
  const { consoleStr, isLoading, needReload } = useSelector(state => ({
    consoleStr : state.common.consoleStr,
    isLoading : state.common.isLoading,
    needReload : state.common.needReload
  }));

  useEffect(() => {
    if (consoleStr === "") return;

    setIsClose(false);
    const closeTimeout = setTimeout(() => setIsClose(true), 3000);
    return () => {
      clearTimeout(closeTimeout);
    }
  }, [consoleStr])

  if(needReload) {//監測有無需要跳轉
    setTimeout(() => window.location.reload(true), 800);
  }

  return (
    <div>
      <div id="console" className={isClose ? "console-close" : "console-open"}>
        {consoleStr}
      </div>
      <div id="loading" className={"full-screan center " + isLoading ? "" : "disable"}>
        <div>
          <div className="loading-icon">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )

}