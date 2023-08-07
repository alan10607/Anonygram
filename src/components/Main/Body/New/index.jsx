import { useTranslation } from 'react-i18next';
import NewReply from '../Forum/Article/Reply/NewReply';
import './new.scss';


export default function New() {
  const { t } = useTranslation();
  return (
    <div id="new">
      <div className="new-box-title">{t("add-post")}</div>
      <NewReply />
    </div>
  )
}