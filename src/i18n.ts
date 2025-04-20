import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: {...en} },
        ru: { translation: {...ru} },
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
    localStorage.setItem("lang", lng);
});
