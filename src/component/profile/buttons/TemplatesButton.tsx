import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const TemplatesButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Button
            color={location.pathname.includes("templates") ? "warning" : ""}
            onClick={() => navigate("templates")}
            className={`border border-warning ${!location.pathname.includes("templates") && "text-theme"}`}
        >
            {t("templates")}
        </Button>
    )
}
