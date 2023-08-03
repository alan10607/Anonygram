import { useTranslation } from 'react-i18next';
import { ICON_USER } from '../../../../util/constant';
import './index.scss';

export default function ContDel({ id, no }) {
  const { t } = useTranslation();

  return (
    <div id={`${id}_${no}`} className="cont">
      <div className="bar">
        <img className="head icon" src={ICON_USER} alt="ICON_USER"/>
        <div className="author">{t("del-author")}</div>
      </div>
      <div className="word">
        <div>
          <span>{t("del-word")}</span> 
        </div>
      </div>
      <div className="info">B{no}, {t("del-done")}</div>
    </div>
  )
}