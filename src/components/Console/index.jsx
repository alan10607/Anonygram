import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { closeConsole, deleteConsole } from '../../redux/actions/common';
import { useLang, useTheme } from '../../util/localSetting';
import './index.scss';

export default function Console() {
  const { console, showLoading } = useSelector(state => ({
    console: state.common.console,
    showLoading: state.common.showLoading
  }), shallowEqual);
  const dispatch = useDispatch();
  useLang();
  useTheme();

  useEffect(() => {
    if (!console) return;

    const closeTimeout = setTimeout(() => {
      dispatch(deleteConsole())
    }, 2000);
    
    return () => {
      clearTimeout(closeTimeout);
    }
  }, [console])

  return (
    <div>
      <div id="console" className={console ? "console-open" : "console-close"}>
        <div>{console}</div>
      </div>
      <div id="loading" className={"full-screan center " + (showLoading ? "" : "disable")}>
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