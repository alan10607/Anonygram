const STYLE_NAME = [
  "--bg-body",
  "--bg-heavy",
  "--bg-normal",
  "--bg-mid",
  "--bg-light",
  "--bg-loginBtn",
  "--color-normal",
  "--color-mid",
  "--color-light",
  "--icon-filter"
];


export const setTheme = (theme = "dark") => {
  const root = document.documentElement;
  const rootStyle = window.getComputedStyle(root);
  for (const name of STYLE_NAME) {
    const value = rootStyle.getPropertyValue(`${name}-${theme}`);
    root.style.setProperty(name, value);
  }

  fixMobilePhoneHeight();
}

/* --- For 100vh problem with mobile phone --- */
const fixMobilePhoneHeight = () => {
  const innerHeight = window.innerHeight;
  document.documentElement.style.setProperty("--window-height", `${innerHeight}px`);
}

window.addEventListener("resize", fixMobilePhoneHeight);