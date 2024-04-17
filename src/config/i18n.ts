import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Language } from '../common/types/Language';
import translation_en from '../locales/en.json';
import translation_es from '../locales/es.json';

const DETECTION_OPTIONS = {
  order: ['navigator']
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    resources: {
      es: {
        translation: translation_es
      },
      en: {
        translation: translation_en
      }
    },
    fallbackLng: Language.EN
  });
