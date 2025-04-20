import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";

export const SubmitButton = () => {
    const { t } = useTranslation();

    return (
        <Button
            color="warning"
            type="submit"
            className="d-flex align-items-center gap-2 justify-content-center"
        >
            {t("submit")}
        </Button>
    )
}