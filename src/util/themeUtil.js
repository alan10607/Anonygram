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


export const setTheme = (theme = "d") => {
  const root = document.documentElement;
  const rootStyle = window.getComputedStyle(root);
  for (const name of STYLE_NAME) {
    const value = rootStyle.getPropertyValue(`${name}-${theme}`);
    root.style.setProperty(name, value);
  }
}