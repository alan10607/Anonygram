import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeConsole } from '../../redux/actions/common';
import './index.scss';

export default function Console() {
  const [isClose, setIsClose] = useState(true);
  const { consoleStr, isLoading } = useSelector(state => ({
    consoleStr : state.common.consoleStr,
    isLoading : state.common.isLoading,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!consoleStr) return;

    const closeTimeout = setTimeout(() => { dispatch(closeConsole()) }, 2000);
    return () => {
      clearTimeout(closeTimeout);
    }
  })

  return (
    <div>
      <div id="console" className={consoleStr ? "console-open" : "console-close"}>
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