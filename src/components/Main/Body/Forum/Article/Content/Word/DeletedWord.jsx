import { useTranslation } from 'react-i18next';

export default function DeletedWord() {
  const { t } = useTranslation();
  
  return (
    <div className="word">
      <div>{t("text.word.deleted")}</div>
    </div>
  )
}