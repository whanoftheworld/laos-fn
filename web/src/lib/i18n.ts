import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import lo from '../locales/lo.json';
import th from '../locales/th.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      lo: { translation: lo },
      th: { translation: th },
    },
    fallbackLng: 'lo',
    supportedLngs: ['lo', 'th'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'lf:lang',
      caches: ['localStorage'],
    },
  });

export default i18n;
