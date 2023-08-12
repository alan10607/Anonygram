import { useTranslation } from 'react-i18next';
import { ICON_USER } from 'util/constant';
import './bar.scss';

export default function DeletedBar() {
  const { t } = useTranslation();

  return (
    <div className="bar">
      <img className="head icon" src={ICON_USER} alt="ICON_USER" />
      <div className="author">{t("text.bar.author.deleted")}</div>
    </div>

  )
}