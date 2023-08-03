import { useTranslation } from 'react-i18next';
import './Info.scss';

export default function DeletedInfo({ id, no }) {
  const { t } = useTranslation();

  return (
    <div className="info">
      <div>@{no}, {t("common.deleted")}</div>
    </div>
  )
}