import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import kn from "./locales/kn.json";
import hi from "./locales/hi.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import de from "./locales/de.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  kn: { translation: kn },
  hi: { translation: hi },
  fr: { translation: fr },
  es: { translation: es },
  de: { translation: de },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: localStorage.getItem("selectedLanguage") || "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "selectedLanguage",
      caches: ["localStorage"],
      cacheUserLanguage: true,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
