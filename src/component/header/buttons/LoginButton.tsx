import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginButton = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const location = useLocation();

    if (location.pathname.includes('login')) return null;

    return (
        <button
            className="button-theme"
            onClick={() => navigate('/login')}
        >
            {t("login")}
        </button>
    );
}
