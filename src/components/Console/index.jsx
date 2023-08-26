import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setConsole } from "redux/actions/common";
import './Console.scss';

export default function Console() {
  const { console, loading } = useSelector(state => ({
    console: state.common.console,
    loading: state.common.loading
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const consoleShowSec = 3;

  useEffect(() => {
    if (!console) return;

    const closeTimeout = setTimeout(() => {
      dispatch(setConsole(""));
    }, consoleShowSec * 1000);

    return () => {
      clearTimeout(closeTimeout);
    }
  }, [console])

  return (
    <div>
      <div id="console" disabled={console === ""}>
        <div>
          <div className="console-title">{t("text.console.title")}</div>
          <div className="line"></div>
          <div>{console}</div>
        </div>
      </div>
      <div id="loading" className="full-screan center" disabled={!loading}>
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