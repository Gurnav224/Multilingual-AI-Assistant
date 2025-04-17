// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// // Import translations
// import enTranslation from './translations/en.json';
// import esTranslation from './translations/es.json';
// import frTranslation from './translations/fr.json';
// import deTranslation from './translations/de.json';
// import zhTranslation from './translations/zh.json';
// import jaTranslation from './translations/ja.json';
// import koTranslation from './translations/ko.json';
// import arTranslation from './translations/ar.json';
// import hiTranslation from './translations/hi.json';
// import ruTranslation from './translations/ru.json';

// // Initialize i18next
// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { translation: enTranslation },
//       es: { translation: esTranslation },
//       fr: { translation: frTranslation },
//       de: { translation: deTranslation },
//       zh: { translation: zhTranslation },
//       ja: { translation: jaTranslation },
//       ko: { translation: koTranslation },
//       ar: { translation: arTranslation },
//       hi: { translation: hiTranslation },
//       ru: { translation: ruTranslation },
//     },
//     lng: 'en', // Default language
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false, // React already escapes values
//     },
//   });

// export default i18n;


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslation from './translations/en.json';
import esTranslation from './translations/es.json';
import frTranslation from './translations/fr.json';
import deTranslation from './translations/de.json';
import zhTranslation from './translations/zh.json';
import jaTranslation from './translations/ja.json';
import koTranslation from './translations/ko.json';
import arTranslation from './translations/ar.json';
import hiTranslation from './translations/hi.json';
import ruTranslation from './translations/ru.json';
import ptTranslation from './translations/pt.json';
import itTranslation from './translations/it.json';
import nlTranslation from './translations/nl.json';
import trTranslation from './translations/tr.json';
import plTranslation from './translations/pl.json';
import svTranslation from './translations/sv.json';
import noTranslation from './translations/no.json';
import daTranslation from './translations/da.json';
import fiTranslation from './translations/fi.json';
import csTranslation from './translations/cs.json';
import elTranslation from './translations/el.json';
import thTranslation from './translations/th.json';
import viTranslation from './translations/vi.json';
import idTranslation from './translations/id.json';
import heTranslation from './translations/he.json';
import ukTranslation from './translations/uk.json';
import roTranslation from './translations/ro.json';
import huTranslation from './translations/hu.json';
import bgTranslation from './translations/bg.json';
import msTranslation from './translations/ms.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      fr: { translation: frTranslation },
      de: { translation: deTranslation },
      zh: { translation: zhTranslation },
      ja: { translation: jaTranslation },
      ko: { translation: koTranslation },
      ar: { translation: arTranslation },
      hi: { translation: hiTranslation },
      ru: { translation: ruTranslation },
      pt: { translation: ptTranslation },
      it: { translation: itTranslation },
      nl: { translation: nlTranslation },
      tr: { translation: trTranslation },
      pl: { translation: plTranslation },
      sv: { translation: svTranslation },
      no: { translation: noTranslation },
      da: { translation: daTranslation },
      fi: { translation: fiTranslation },
      cs: { translation: csTranslation },
      el: { translation: elTranslation },
      th: { translation: thTranslation },
      vi: { translation: viTranslation },
      id: { translation: idTranslation },
      he: { translation: heTranslation },
      uk: { translation: ukTranslation },
      ro: { translation: roTranslation },
      hu: { translation: huTranslation },
      bg: { translation: bgTranslation },
      ms: { translation: msTranslation },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;