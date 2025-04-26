import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CreateTemplateButton = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Button
            color="warning"
            onClick={() => navigate("/template/create")}
        >
            {t("createTemplate")}
        </Button>
    )
}
