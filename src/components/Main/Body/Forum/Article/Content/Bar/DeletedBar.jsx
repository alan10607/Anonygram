import { useTranslation } from 'react-i18next';
import { ICON_USER } from 'config/constant';
import './Bar.scss';

export default function DeletedBar() {
  return (
    <div className="bar">
      <img className="head icon" src={ICON_USER} alt="ICON_USER" />
      <div className="author">-</div>
    </div>

  )
}