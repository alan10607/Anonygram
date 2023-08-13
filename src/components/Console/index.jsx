import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deleteConsole } from 'redux/actions/common';
import './console.scss';
import { useTranslation } from 'react-i18next';

export default function Console() {
  const { console, loading } = useSelector(state => ({
    console: state.common.console,
    loading: state.common.loading
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const consoleShowSec = 2;

  useEffect(() => {
    if (!console) return;

    const closeTimeout = setTimeout(() => {
      dispatch(deleteConsole())
    }, consoleShowSec * 1000);

    return () => {
      clearTimeout(closeTimeout);
    }
  }, [console])

  return (
    <div>
      <div id="console" disabled={!!console}>
        <div>
          <div>{t("text.console.title")}</div>
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