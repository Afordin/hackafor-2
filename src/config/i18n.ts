import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from '../common/types/Language';
import translation_es from '../locales/es.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      es: {
        translation: translation_es
      }
    },
    lng: Language.ES,
    fallbackLng: Language.ES,

    interpolation: {
      escapeValue: false
    }
  });
