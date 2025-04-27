import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const FillOutButton = () => {
    const navigate = useNavigate();
    const { templateId = '' } = useParams();
    const { t } = useTranslation();

    return (
        <Button
            type="button"
            color="warning"
            className="rounded-pill"
            onClick={() => navigate(`/template/${templateId}/response/create`)}
        >
            {t("fillOut")}
        </Button>
    )
}
