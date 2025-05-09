import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ResponseButtonProps {
    responseId: string;
}

export const ResponseButton = ({ responseId }: ResponseButtonProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Button
            type="button"
            color="warning"
            className="rounded-pill"
            onClick={() => navigate(`/response/${responseId}`)}
        >
            {t("response")}
        </Button>
    )
}
