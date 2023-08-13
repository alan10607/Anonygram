const styleName = [
  "bg-body",
  "bg-box",
  "bg-setting",
  "bg-btn",
  "bg-login-btn",
  "color-normal",
  "color-mid",
  "color-light",
  "icon-filter"
];

export const setTheme = (theme) => {
  const root = document.documentElement;
  const rootStyle = window.getComputedStyle(root);
  for (const name of styleName) {
    const value = rootStyle.getPropertyValue(`--${theme}-${name}`);
    root.style.setProperty(`--${name}`, value);
  }
}