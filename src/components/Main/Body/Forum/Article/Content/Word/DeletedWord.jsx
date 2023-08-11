import { useTranslation } from 'react-i18next';

export default function DeletedWord() {
  const { t } = useTranslation();
  
  return (
    <div className="word">
      <div>
        <span>{t("del-word")}</span>
      </div>
    </div>
  )
}