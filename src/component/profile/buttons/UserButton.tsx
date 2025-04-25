import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const UserButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Button
            color={location.pathname.includes('user') ? "warning" : ""}
            onClick={() => navigate("user")}
            className={`border border-warning ${!location.pathname.includes('user') && "text-theme"}`}
        >
            {t("user")}
        </Button>
    )
}
