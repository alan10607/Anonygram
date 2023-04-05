import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export default i18n
  .use(Backend)
  // .use(LanguageDetector)//detect user language
  .use(initReactI18next)//pass the i18n instance to react-i18next.
  .init({
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}.json`
    },
    fallbackLng: 'en',
    lng: "en", // default language
    // debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });