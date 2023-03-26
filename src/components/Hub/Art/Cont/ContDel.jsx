import React from 'react';
import { useTranslation } from 'react-i18next';
import { ICON_USER } from '../../../../utli/constant';
import './index.css';

export default function ContDel({ id, no }) {
  const { t } = useTranslation();

  return (
    <div id={`${id}_${no}`} className="cont">
      <div className="bar">
        <img className="bar-head" src={ICON_USER} />
        <div className="author">{t("del-author")}</div>
      </div>
      <div className="word">{t("del-word")}</div>
      <div className="info">B{no} ,  {t("del-done")}</div>
    </div>
  )
}