import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () =>
        i18n.changeLanguage(i18n.language === "en" ? "ru" : "en");

    return (
        <button
            onClick={toggleLanguage}
            className="button-theme"
        >
            {i18n.language === "en" ? "English" : "Русский"}
            <i className="bi bi-translate"></i>
        </button>
    )
}
