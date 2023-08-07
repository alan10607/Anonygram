export default function SettingOption(name = "", optionMap = {}, value, setValue) {
  return (
    <div>
      <div>{name}</div>
      <select value={value} onChange={(event) => { setValue(event.target.value) }}>
        {optionMap.map(opt => (
          <option key={opt.name} value={opt.value}>{opt.name}</option>
        ))}
      </select>
    </div>

  )
}