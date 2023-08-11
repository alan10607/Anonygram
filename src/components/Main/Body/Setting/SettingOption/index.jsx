import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import "./settingOption.scss";

export default function SettingOption({ name = "", optionArray = [], value, setValue }) {
  const { isAnonymous } = useSelector(state => ({
    isAnonymous: state.user.isAnonymous,
  }), shallowEqual);

  return (
    <div className="setting-option">
      <div>{name}</div>
      <select value={value}
        onChange={(event) => { setValue(event.target.value) }}
        disabled={isAnonymous}>
        {optionArray.map(opt => (
          <option key={opt.name} value={opt.value}>{opt.name}</option>
        ))}
      </select>
    </div>

  )
}