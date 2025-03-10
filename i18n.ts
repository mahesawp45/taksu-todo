import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import global_en from './translations/en/global.json';
import global_id from './translations/id/global.json';
// import { en } from './translations/en/global';
// import { id } from './translations/id/global';

const resources = {
  en: {
    global: global_en,
  },
  id: {
    global: global_id,
  },
  // en: {
  //   global: en,
  // },
  // id: {
  //   global: id,
  // },
};

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',

  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
  react: {
    useSuspense: true,
  },
});

export default i18n;
