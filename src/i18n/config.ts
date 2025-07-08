import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traduções
import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';

// Recursos de tradução
const resources = {
  en: enTranslation,
  pt: ptTranslation
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt', // Idioma padrão
    debug: process.env.NODE_ENV === 'development',
    defaultNS: 'common',
    ns: ['common', 'theme', 'auth'],
    interpolation: {
      escapeValue: false, // Não é necessário para React
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
    returnObjects: true, // Permite o retorno de objetos nas traduções
  });

export default i18n;
