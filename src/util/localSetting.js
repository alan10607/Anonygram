import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from "./localStorage";
import { LOCAL_SETTING, LANG, THEME } from "./constant";

const initState = {
  jwt: {},
  lang: "",
  theme: ""
};


export const useLocalSetting = () => {
  const [setting, setSetting] = useLocalStorage(LOCAL_SETTING, initState);
  const { jwt, lang, theme } = setting;
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang])

  useEffect(() => {
    setRootStyle(theme);
  }, [theme])

  const setJwt = (jwt) => setSetting(Object.assign({}, setting, { jwt }));
  const setJwtByToken = (token) => setSetting(Object.assign({}, setting, { jwt: parseTokenToJwt(jwt) }));
  const setLang = (lang) => setSetting(Object.assign({}, setting, { lang }));
  const setTheme = (theme) => setSetting(Object.assign({}, setting, { theme }));

  return [setting, { setJwt, setLang, setTheme }];
}

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

const parseTokenToJwt = (token) => {
  if (!token) throw new Error("No jwt token!");

  const jwt = token ? JSON.parse(window.atob(jwt.split('.')[1])) : {};
  jwt.token = token;
  jwt.isAnonymous = !jwt.email || jwt.email.trim() === "";
  jwt.isVaild = () => this.exp > Math.floor(Date.now() / 1000);
  return jwt;
}