import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const AdminButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <button
            className="button-theme"
            onClick={() => navigate('/admin')}
        >
            {t("admin")}
        </button>
    )
}