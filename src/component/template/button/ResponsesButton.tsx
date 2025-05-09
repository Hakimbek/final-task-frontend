import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";

export const ResponsesButton = () => {
    const navigate = useNavigate();
    const { templateId = '' } = useParams();
    const { t } = useTranslation();

    return (
        <Button
            type="button"
            color="warning"
            className="rounded-pill"
            onClick={() => navigate(`/template/${templateId}/responses`)}
        >
            {t("responses")}
        </Button>
    )
}
