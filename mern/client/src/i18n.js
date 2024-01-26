import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json'; // Import English translations
import translationFR from './locales/fr.json'; // Import French translations
import translationES from './locales/es.json'; // Import Spanish translations
import translationZH from './locales/zh.json'; // Import Chinese translations
import translationJA from './locales/ja.json'; // Import Japanese translations
import translationKO from './locales/ko.json'; // Import Korean translations

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  es: {
    translation: translationES
  },
  zh: {
    translation: translationZH
  },
  ja: {
    translation: translationJA
  },
  ko: {
    translation: translationKO
  }
};

i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources,
    lng: 'en', // Set the default language
    keySeparator: false, // Remove the separation between keys and namespaces
    interpolation: {
      escapeValue: false // Do not escape string interpolation
    }
  });

export default i18n;
