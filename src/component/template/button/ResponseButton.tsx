import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";

export const ResponseButton = () => {
    const navigate = useNavigate();
    const { templateId = '' } = useParams();
    const { t } = useTranslation();

    return (
        <Button
            color="warning"
            className="rounded-pill"
            onClick={() => navigate(`/responses/${templateId}`)}
        >
            {t("responses")}
        </Button>
    )
}