import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from "./localStorage";
import { LANG, THEME } from "./constant";

export const useLang = () => {
  const [lang, setLang] = useLocalStorage(LANG, "en");
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang])

  return [lang, setLang];
}

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(THEME, "light");

  useEffect(() => {
    setRootStyle(theme);
  }, [theme])

  return [theme, setTheme];
}

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

const setRootStyle = (theme) => {
  const root = document.documentElement;
  const rootStyle = window.getComputedStyle(root);
  for (let name of styleName) {
    const value = rootStyle.getPropertyValue(`--${theme}-${name}`);
    root.style.setProperty(`--${name}`, value);
  }
}