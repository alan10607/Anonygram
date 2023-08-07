import "./settingOption.scss";

export default function SettingOption({ name = "", optionArray = [], value, setValue }) {
  return (
    <div className="setting-option">
      <div>{name}</div>
      <select value={value} onChange={(event) => { setValue(event.target.value) }}>
        {optionArray.map(opt => (
          <option key={opt.name} value={opt.value}>{opt.name}</option>
        ))}
      </select>
    </div>

  )
}