import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationSw from '../locales/sw/translation.json';
import translationEn from '../locales/en/translation.json';


const resources = {
  en:{ translation: translationEn },
  sw: { translation: translationSw },

};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'sw',
  interpolation: {
    escapeValue: false // React already escapes by default
  }
});

export default i18n;