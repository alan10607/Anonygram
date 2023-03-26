import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.css';

export default function Console() {
  const [isClose, setIsClose] = useState(true);
  const { consoleStr, isLoading } = useSelector(state => ({
    consoleStr : state.common.consoleStr,
    isLoading : state.common.isLoading,
  }));

  useEffect(() => {
    if (!consoleStr) return;

    setIsClose(false);
    const closeTimeout = setTimeout(() => setIsClose(true), 3000);
    return () => {
      clearTimeout(closeTimeout);
    }
  }, [consoleStr])

  return (
    <div>
      <div id="console" className={isClose ? "console-close" : "console-open"}>
        {consoleStr}
      </div>
      <div id="loading" className={"full-screan center " + (isLoading ? "" : "disable")}>
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