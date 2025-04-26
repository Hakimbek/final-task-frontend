import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const SignupButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname.includes("signup")) return null;

    return (
        <button
            className="button-theme"
            onClick={() => navigate("/signup")}
        >
            {t("signup")}
        </button>
    );
}
