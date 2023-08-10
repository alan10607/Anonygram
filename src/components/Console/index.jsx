import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { closeConsole } from '../../redux/actions/common';
import { useLang, useTheme } from '../../util/localSetting';
import './index.scss';

export default function Console() {
  const { consoleString, isLoading } = useSelector(state => ({
    consoleString: state.common.consoleString,
    isLoading: state.common.isLoading
  }), shallowEqual);
  const dispatch = useDispatch();
  useLang();
  useTheme();

  useEffect(() => {
    if (!consoleString) return;

    const closeTimeout = setTimeout(() => { dispatch(closeConsole()) }, 2000);
    return () => {
      clearTimeout(closeTimeout);
    }
  })

  return (
    <div>
      <div id="console" className={consoleString ? "console-open" : "console-close"}>
        <div>{consoleString}</div>
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