import { useTranslation } from 'react-i18next';
import './Word.scss';

export default function DeletedWord() {
  const { t } = useTranslation();
  
  return (
    <div className="word">
      <div>{t("text.word.deleted")}</div>
    </div>
  )
}