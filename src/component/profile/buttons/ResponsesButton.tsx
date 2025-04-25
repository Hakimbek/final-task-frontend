import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const ResponsesButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Button
            color={location.pathname.includes('responses') ? "warning" : ""}
            onClick={() => navigate("responses")}
            className={`border border-warning ${!location.pathname.includes('responses') && "text-theme"}`}
        >
            {t("responses")}
        </Button>
    )
}
